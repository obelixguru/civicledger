// Hand-written types for the CivicLedger schema.
// Mirrors the SQL migration `init_civicledger_schema`. Regenerate with
// `npx supabase gen types typescript --project-id <id>` once you wire up auth.

export type ProjectCategory =
  | "Éducation"
  | "Santé"
  | "Eau"
  | "Alimentation"
  | "Climat"
  | "Logement";

export type ChainName = "Polygon" | "Base" | "Solana";
export type StablecoinName = "USDC" | "EURC";
export type ProjectStatus = "draft" | "active" | "completed" | "refunded";
export type LedgerEventType =
  | "donation"
  | "lock"
  | "proof_submitted"
  | "release"
  | "audit";

export type AssociationRow = {
  id: string;
  slug: string;
  name: string;
  location: string;
  verified: boolean;
  since_year: number;
  created_at: string;
};

export type ProjectRow = {
  id: string;
  slug: string;
  association_id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  image_url: string;
  goal_amount: number;
  raised_amount: number;
  donor_count: number;
  ends_at: string;
  transparency_score: number;
  contract_address: string;
  chain: ChainName;
  stablecoin: StablecoinName;
  status: ProjectStatus;
  created_at: string;
};

export type LedgerEventRow = {
  id: string;
  project_id: string;
  type: LedgerEventType;
  amount_eur: number | null;
  tx_hash: string;
  actor: string;
  detail: string;
  occurred_at: string;
};

export type Database = {
  public: {
    Tables: {
      associations: {
        Row: AssociationRow;
        Insert: Omit<AssociationRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<AssociationRow>;
      };
      projects: {
        Row: ProjectRow;
        Insert: Omit<ProjectRow, "id" | "created_at" | "raised_amount" | "donor_count" | "transparency_score" | "status"> & {
          id?: string;
          created_at?: string;
          raised_amount?: number;
          donor_count?: number;
          transparency_score?: number;
          status?: ProjectStatus;
        };
        Update: Partial<ProjectRow>;
      };
      ledger_events: {
        Row: LedgerEventRow;
        Insert: Omit<LedgerEventRow, "id" | "occurred_at"> & {
          id?: string;
          occurred_at?: string;
        };
        Update: Partial<LedgerEventRow>;
      };
    };
  };
};
