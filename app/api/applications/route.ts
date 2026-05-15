import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase/server";

export const runtime = "nodejs";

type ApplyBody = {
  name: string;
  legalForm: string;
  registrationNumber?: string;
  country: string;
  city: string;
  foundedYear: number;
  contactName: string;
  email: string;
  website?: string;
  description: string;
  estimatedAnnualBudgetEur?: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: ApplyBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = [
    "name",
    "legalForm",
    "country",
    "city",
    "foundedYear",
    "contactName",
    "email",
    "description",
  ] as const;
  for (const k of required) {
    if (!body[k]) {
      return NextResponse.json(
        { error: `Champ requis manquant : ${k}` },
        { status: 400 },
      );
    }
  }

  if (!EMAIL_RE.test(body.email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }
  if (body.description.length < 80) {
    return NextResponse.json(
      { error: "La description doit faire au moins 80 caractères" },
      { status: 400 },
    );
  }
  if (
    body.foundedYear < 1900 ||
    body.foundedYear > new Date().getFullYear()
  ) {
    return NextResponse.json({ error: "Année invalide" }, { status: 400 });
  }

  const { error } = await supabase.from("applications").insert({
    name: body.name.trim(),
    legal_form: body.legalForm.trim(),
    registration_number: body.registrationNumber?.trim() || null,
    country: body.country.trim(),
    city: body.city.trim(),
    founded_year: body.foundedYear,
    contact_name: body.contactName.trim(),
    email: body.email.trim().toLowerCase(),
    website: body.website?.trim() || null,
    description: body.description.trim(),
    estimated_annual_budget_eur: body.estimatedAnnualBudgetEur ?? null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer la candidature", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
