import { supabase } from "@/lib/supabase/server";
import type {
  AssociationRow,
  ChainName,
  LedgerEventRow,
  LedgerEventType,
  ProjectCategory,
  ProjectRow,
  ProjectStatus,
  StablecoinName,
} from "@/lib/supabase/types";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  imageUrl: string;
  association: {
    name: string;
    verified: boolean;
    sinceYear: number;
    location: string;
  };
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  transparencyScore: number;
  contractAddress: string;
  chain: ChainName;
  stablecoin: StablecoinName;
  status: ProjectStatus;
};

export type LedgerEvent = {
  id: string;
  type: LedgerEventType;
  projectSlug: string;
  amount?: number;
  txHash: string;
  timestamp: string;
  actor: string;
  detail: string;
};

type ProjectWithAssoc = ProjectRow & {
  associations: Pick<AssociationRow, "name" | "verified" | "since_year" | "location"> | null;
};

function mapProject(row: ProjectWithAssoc): Project {
  const endsAt = new Date(row.ends_at).getTime();
  const daysLeft = Math.max(0, Math.ceil((endsAt - Date.now()) / 86_400_000));

  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    category: row.category,
    imageUrl: row.image_url,
    association: {
      name: row.associations?.name ?? "—",
      verified: row.associations?.verified ?? false,
      sinceYear: row.associations?.since_year ?? 0,
      location: row.associations?.location ?? "",
    },
    goal: Number(row.goal_amount),
    raised: Number(row.raised_amount),
    donors: row.donor_count,
    daysLeft,
    transparencyScore: Number(row.transparency_score),
    contractAddress: row.contract_address,
    chain: row.chain,
    stablecoin: row.stablecoin,
    status: row.status,
  };
}

type LedgerEventWithProject = LedgerEventRow & {
  projects: Pick<ProjectRow, "slug"> | null;
};

function mapEvent(row: LedgerEventWithProject): LedgerEvent {
  return {
    id: row.id,
    type: row.type,
    projectSlug: row.projects?.slug ?? "",
    amount: row.amount_eur ? Number(row.amount_eur) : undefined,
    txHash: row.tx_hash,
    timestamp: row.occurred_at,
    actor: row.actor,
    detail: row.detail,
  };
}

const PROJECT_SELECT =
  "*, associations ( name, verified, since_year, location )";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .in("status", ["active", "completed"])
    .order("created_at", { ascending: false });

  if (error) throw new Error(`getProjects: ${error.message}`);
  return (data as unknown as ProjectWithAssoc[]).map(mapProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`getProject(${slug}): ${error.message}`);
  if (!data) return null;
  return mapProject(data as unknown as ProjectWithAssoc);
}

export async function getProjectSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .in("status", ["active", "completed"]);
  if (error) throw new Error(`getProjectSlugs: ${error.message}`);
  return (data ?? []).map((r) => r.slug);
}

export async function getRecentEvents(limit = 5): Promise<LedgerEvent[]> {
  const { data, error } = await supabase
    .from("ledger_events")
    .select("*, projects ( slug )")
    .order("occurred_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`getRecentEvents: ${error.message}`);
  return (data as unknown as LedgerEventWithProject[]).map(mapEvent);
}

export async function getAllEvents(limit = 100): Promise<LedgerEvent[]> {
  const { data, error } = await supabase
    .from("ledger_events")
    .select("*, projects ( slug )")
    .order("occurred_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`getAllEvents: ${error.message}`);
  return (data as unknown as LedgerEventWithProject[]).map(mapEvent);
}

export async function getEventsForProject(
  slug: string,
  limit = 20,
): Promise<LedgerEvent[]> {
  const { data: project, error: pErr } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (pErr) throw new Error(`getEventsForProject: ${pErr.message}`);
  if (!project) return [];

  const { data, error } = await supabase
    .from("ledger_events")
    .select("*, projects ( slug )")
    .eq("project_id", project.id)
    .order("occurred_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`getEventsForProject: ${error.message}`);
  return (data as unknown as LedgerEventWithProject[]).map(mapEvent);
}
