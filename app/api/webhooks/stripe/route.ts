import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { mintForDonation } from "@/lib/circle";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ProjectRow } from "@/lib/supabase/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    return NextResponse.json(
      {
        error: "Webhook signature verification failed",
        detail: err instanceof Error ? err.message : "unknown",
      },
      { status: 400 },
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const donationId = session.metadata?.donation_id;
  const projectSlug = session.metadata?.project_slug;

  if (!donationId || !projectSlug) {
    return NextResponse.json(
      { error: "Missing donation_id or project_slug in metadata" },
      { status: 400 },
    );
  }

  const admin = getSupabaseAdmin();

  const { data: donationData, error: dErr } = await admin
    .from("donations")
    .update({
      status: "succeeded",
      stripe_payment_intent_id:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null,
    })
    .eq("id", donationId)
    .select("*")
    .single();
  const donation = donationData as {
    id: string;
    amount_eur: number;
    project_id: string;
  } | null;

  if (dErr || !donation) {
    return NextResponse.json(
      { error: "Donation not found", detail: dErr?.message },
      { status: 404 },
    );
  }

  const { data: projectData } = await admin
    .from("projects")
    .select("*")
    .eq("id", donation.project_id)
    .single();
  const project = projectData as ProjectRow | null;

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  if (
    project.source !== "civicledger_native" ||
    !project.contract_address ||
    !project.chain ||
    !project.stablecoin
  ) {
    return NextResponse.json(
      { error: "Project is not a native CivicLedger project" },
      { status: 409 },
    );
  }

  // Atomic bump via SECURITY DEFINER function
  await admin.rpc("bump_project_totals", {
    p_project_id: project.id,
    p_amount: donation.amount_eur,
  });

  await admin.from("ledger_events").insert({
    project_id: project.id,
    type: "donation",
    amount_eur: donation.amount_eur,
    tx_hash: `stripe:${session.payment_intent ?? session.id}`,
    actor: session.customer_details?.name ?? "Anonyme",
    detail: `Don par carte → mint ${project.stablecoin} en cours`,
  });

  const mint = await mintForDonation({
    amountEur: donation.amount_eur,
    stablecoin: project.stablecoin,
    chain: project.chain,
    recipientContract: project.contract_address,
    reference: donation.id,
  });

  await admin.from("ledger_events").insert({
    project_id: project.id,
    type: "lock",
    amount_eur: donation.amount_eur,
    tx_hash: mint.txHash,
    actor: `Circle (${mint.provider})`,
    detail: `${donation.amount_eur} ${project.stablecoin} verrouillés sur le smart contract`,
  });

  return NextResponse.json({ ok: true, donationId, mint });
}
