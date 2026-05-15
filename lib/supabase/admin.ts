import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types";

// Server-side Supabase client with the service role key. Bypasses RLS — only
// use from `app/api/**` routes that have validated the caller. NEVER import
// this from a client component or a server component that renders public HTML.

let _admin: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (_admin) return _admin;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase admin not configured: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }

  _admin = createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-civicledger-source": "next-admin" } },
  });
  return _admin;
}
