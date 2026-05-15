import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local",
  );
}

// Single shared client for server components.
// Public reads only — RLS protects everything that isn't meant to be public.
export const supabase = createClient<Database>(url, anonKey, {
  auth: { persistSession: false },
  global: { headers: { "x-civicledger-source": "next-server" } },
});
