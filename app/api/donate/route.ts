import { NextResponse } from "next/server";

import { mintForDonation } from "@/lib/circle";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ProjectRow } from "@/lib/supabase/types";

export const runtime = "nodejs";

type DonateBody = {
  projectSlug: string;
  amountEur: number;
  donorEmail?: string;
  donorName?: string;
};

export async function POST(req: Request) {
  let body: DonateBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { projectSlug, amountEur, donorEmail, donorName } = body;
  if (!projectSlug || typeof amountEur !== "number" || amountEur <= 0) {
    return NextResponse.json(
      { error: "projectSlug and amountEur > 0 are required" },
      { status: 400 },
    );
  }
  if (amountEur > 10_000) {
    return NextResponse.json(
      { error: "Donations capped at 10 000 € for now — contact us for more" },
      { status: 400 },
    );
  }

  let admin;
  try {
    admin = getSupabaseAdmin();
  } catch (err) {
    return NextResponse.json(
      {
        error: "Backend not configured",
        detail: err instanceof Error ? err.message : "unknown",
      },
      { status: 503 },
    );
  }

  // Look up the project (service role bypasses RLS, so we can see drafts too)
  const { data, error: pErr } = await admin
    .from("projects")
    .select("*")
    .eq("slug", projectSlug)
    .maybeSingle();
  const project = data as ProjectRow | null;

  if (pErr || !project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  if (project.status !== "active") {
    return NextResponse.json(
      { error: `Project is ${project.status}, donations closed` },
      { status: 409 },
    );
  }

  // Pre-create a pending donation row so we have an ID to thread through Stripe
  const { data: donationData, error: dErr } = await admin
    .from("donations")
    .insert({
      project_id: project.id,
      amount_eur: amountEur,
      donor_email: donorEmail ?? null,
      donor_name: donorName ?? null,
      status: "pending",
    })
    .select("id")
    .single();
  const donation = donationData as { id: string } | null;

  if (dErr || !donation) {
    return NextResponse.json(
      { error: "Failed to record donation", detail: dErr?.message },
      { status: 500 },
    );
  }

  // --- Path A: Stripe configured → redirect to real Checkout ---
  if (isStripeConfigured()) {
    const origin = new URL(req.url).origin;
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(amountEur * 100),
            product_data: {
              name: `Don à : ${project.title}`,
              description: `CivicLedger · ${project.chain} · ${project.stablecoin}`,
            },
          },
        },
      ],
      customer_email: donorEmail,
      metadata: {
        donation_id: donation.id,
        project_slug: project.slug,
      },
      success_url: `${origin}/donations/success?donation_id=${donation.id}`,
      cancel_url: `${origin}/projects/${project.slug}?canceled=1`,
    });

    return NextResponse.json({ checkoutUrl: session.url, mode: "stripe" });
  }

  // --- Path B: demo mode (no Stripe) → mark succeeded + mint mock USDC/EURC ---
  // This keeps the open-source repo testable without payment provider keys.
  await admin
    .from("donations")
    .update({ status: "succeeded" })
    .eq("id", donation.id);

  await admin.rpc("bump_project_totals", {
    p_project_id: project.id,
    p_amount: amountEur,
  });

  await admin.from("ledger_events").insert({
    project_id: project.id,
    type: "donation",
    amount_eur: amountEur,
    tx_hash: `0x${donation.id.replace(/-/g, "").slice(0, 40)}`,
    actor: donorName ?? "Anonyme",
    detail: `Don démo (Stripe non configuré) → mint ${project.stablecoin} simulé`,
  });

  const mint = await mintForDonation({
    amountEur,
    stablecoin: project.stablecoin,
    chain: project.chain,
    recipientContract: project.contract_address,
    reference: donation.id,
  });

  await admin.from("ledger_events").insert({
    project_id: project.id,
    type: "lock",
    amount_eur: amountEur,
    tx_hash: mint.txHash,
    actor: `Circle (${mint.provider})`,
    detail: `${amountEur} ${project.stablecoin} verrouillés sur le smart contract`,
  });

  const origin = new URL(req.url).origin;
  return NextResponse.json({
    checkoutUrl: `${origin}/donations/success?donation_id=${donation.id}&demo=1`,
    mode: "demo",
  });
}
