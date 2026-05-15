// Hand-written types for the CivicLedger schema.
// Mirrors the SQL migration `init_civicledger_schema`. Regenerate with
// `npx supabase gen types typescript --project-id <id>` once auth is wired.

export type ProjectCategory =
  | "Éducation"
  | "Santé"
  | "Eau"
  | "Alimentation"
  | "Climat"
  | "Logement"
  | "Solidarité";

export type ChainName = "Polygon" | "Base" | "Solana";
export type StablecoinName = "USDC" | "EURC";
export type ProjectStatus = "draft" | "active" | "completed" | "refunded";
export type ProjectSource = "external_showcase" | "civicledger_native";
export type DonationStatus = "pending" | "succeeded" | "refunded";
export type LedgerEventType =
  | "donation"
  | "lock"
  | "proof_submitted"
  | "release"
  | "audit";
export type ProofValidation =
  | "pending"
  | "ai_validated"
  | "human_validated"
  | "rejected";

export type AssociationRow = {
  id: string;
  slug: string;
  name: string;
  location: string;
  verified: boolean;
  since_year: number;
  trust_score: number | null;
  overall_score: number | null;
  grade: string | null;
  scoring_methodology: string | null;
  website: string | null;
  don_en_confiance: boolean;
  scored_at: string | null;
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
  contract_address: string | null;
  chain: ChainName | null;
  stablecoin: StablecoinName | null;
  source: ProjectSource;
  external_url: string | null;
  external_donation_method: string | null;
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

export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "approved"
  | "rejected";

export type ApplicationRow = {
  id: string;
  name: string;
  legal_form: string;
  registration_number: string | null;
  country: string;
  city: string;
  founded_year: number;
  contact_name: string;
  email: string;
  website: string | null;
  description: string;
  estimated_annual_budget_eur: number | null;
  status: ApplicationStatus;
  ai_score: number | null;
  reviewer_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type DonationRow = {
  id: string;
  project_id: string;
  amount_eur: number;
  donor_email: string | null;
  donor_name: string | null;
  stripe_payment_intent_id: string | null;
  status: DonationStatus;
  created_at: string;
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
        Relationships: [];
      };
      projects: {
        Row: ProjectRow;
        Insert: Omit<
          ProjectRow,
          | "id"
          | "created_at"
          | "raised_amount"
          | "donor_count"
          | "transparency_score"
          | "status"
        > & {
          id?: string;
          created_at?: string;
          raised_amount?: number;
          donor_count?: number;
          transparency_score?: number;
          status?: ProjectStatus;
        };
        Update: Partial<ProjectRow>;
        Relationships: [
          {
            foreignKeyName: "projects_association_id_fkey";
            columns: ["association_id"];
            isOneToOne: false;
            referencedRelation: "associations";
            referencedColumns: ["id"];
          },
        ];
      };
      ledger_events: {
        Row: LedgerEventRow;
        Insert: Omit<LedgerEventRow, "id" | "occurred_at"> & {
          id?: string;
          occurred_at?: string;
        };
        Update: Partial<LedgerEventRow>;
        Relationships: [
          {
            foreignKeyName: "ledger_events_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      applications: {
        Row: ApplicationRow;
        Insert: {
          id?: string;
          name: string;
          legal_form: string;
          registration_number?: string | null;
          country: string;
          city: string;
          founded_year: number;
          contact_name: string;
          email: string;
          website?: string | null;
          description: string;
          estimated_annual_budget_eur?: number | null;
          status?: ApplicationStatus;
          ai_score?: number | null;
          reviewer_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ApplicationRow>;
        Relationships: [];
      };
      donations: {
        Row: DonationRow;
        Insert: {
          id?: string;
          project_id: string;
          amount_eur: number;
          donor_email?: string | null;
          donor_name?: string | null;
          stripe_payment_intent_id?: string | null;
          status?: DonationStatus;
          created_at?: string;
        };
        Update: Partial<DonationRow>;
        Relationships: [
          {
            foreignKeyName: "donations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      bump_project_totals: {
        Args: { p_project_id: string; p_amount: number };
        Returns: undefined;
      };
    };
    Enums: {
      project_category: ProjectCategory;
      chain_name: ChainName;
      stablecoin_name: StablecoinName;
      project_status: ProjectStatus;
      project_source: ProjectSource;
      ledger_event_type: LedgerEventType;
      donation_status: DonationStatus;
      proof_validation: ProofValidation;
      application_status: ApplicationStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
