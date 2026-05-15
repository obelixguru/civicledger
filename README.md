# CivicLedger

> Donations you can verify, on-chain. Credit-card simplicity, blockchain-grade proof.

CivicLedger is an open-source platform for transparent charitable giving.
Donors pay by card; the platform converts to stablecoin (EURC / USDC) and
locks funds in a per-project smart contract. Funds are only released once the
association submits verifiable proof of spend — invoice, geolocated photo,
delivery date — validated by an AI audit layer.

**Closed onboarding** for charities: only registered associations (loi 1901 or
equivalent) with at least 12 months of activity can apply. **10 % minimum**
of donations must remain traceable and scorable.

This repository is **fully open source under the MIT license**.

---

## Stack

- **App** — Next.js 15 (App Router) · React 19 · TypeScript
- **Styling** — Tailwind v4 · shadcn/ui (New York style) · Geist Sans + Instrument Serif
- **Data** — Supabase (Postgres 17 + RLS)
- **Hosting** — Vercel (planned)
- **Payments** — Stripe Checkout (planned)
- **On-chain** — Circle Programmable Wallets · Polygon · Base (planned)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up env
cp .env.example .env.local
# Fill in your Supabase URL + publishable key from
# https://supabase.com/dashboard/project/_/settings/api

# 3. Run the dev server (port 3030)
npm run dev
```

Open [http://localhost:3030](http://localhost:3030).

## Database

Schema lives in Supabase migrations applied to the linked project. Core tables:

| Table | Purpose | Public read |
|-------|---------|-------------|
| `associations` | Verified charities | yes (verified only) |
| `projects` | Campaigns | yes (non-draft) |
| `ledger_events` | Public on-chain timeline | yes |
| `proofs` | Disbursement justifications | yes (validated only) |
| `donations` | Donor records (PII) | **no** — service role only |

All reads from the Next.js app use the **publishable / anon key** with RLS
enforcing the policies above. Writes that touch PII or financial state run
through server routes with the **service role** key.

## Project structure

```
app/                  # Next.js routes (server components)
  page.tsx            # Landing
  projects/           # List + detail
components/
  landing/            # Page-specific sections
  projects/           # Card, etc.
  ui/                 # shadcn primitives
  brand/              # Logo
lib/
  data/projects.ts    # Async Supabase queries
  data/stats.ts       # Static config (FAQ, partners)
  supabase/server.ts  # Typed client
  supabase/types.ts   # Hand-written DB types
  utils.ts            # cn(), formatEUR(), shortHash(), etc.
```

## Contributing

Issues and PRs welcome. Three rules:

1. **No PII in client bundles.** Donor-identifying data must stay server-side.
2. **No breaking the audit trail.** Adding a state transition? Emit a
   `ledger_events` row.
3. **Keep the donor UX boring.** No wallets, no signing prompts, no jargon.
   If a non-crypto user can't do it, it doesn't ship.

## License

[MIT](./LICENSE)
