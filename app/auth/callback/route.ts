import { NextResponse } from "next/server";

// Magic-link callback. Supabase will redirect the user here after they click
// the link in their inbox; the URL contains a `code` query param (or hash, if
// using the implicit flow). For v0.1 we don't have a logged-in dashboard yet,
// so we just acknowledge receipt and bounce the user to the homepage with a
// flash flag — full session bootstrap can be wired later via @supabase/ssr.

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const target = code ? "/?welcome=1" : "/login?error=invalid_link";
  return NextResponse.redirect(new URL(target, url.origin));
}
