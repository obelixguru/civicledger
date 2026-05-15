import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email || !EMAIL_RE.test(body.email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const origin = new URL(req.url).origin;
  const { error } = await supabase.auth.signInWithOtp({
    email: body.email.trim().toLowerCase(),
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json(
      { error: "Impossible d'envoyer le lien magique", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
