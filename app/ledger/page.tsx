import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Lock,
  Sparkles,
  Wallet,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { getAllEvents, getProjects } from "@/lib/data/projects";
import type { LedgerEventType } from "@/lib/supabase/types";
import { formatEUR, relativeTime, shortHash } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Registre public",
  description:
    "Tous les événements on-chain de la plateforme CivicLedger — dons, justificatifs, décaissements, audits. Lecture libre.",
};

export const revalidate = 30;

const typeMeta: Record<
  LedgerEventType,
  { label: string; icon: React.ElementType; tone: string }
> = {
  donation: { label: "Don reçu", icon: Wallet, tone: "text-brand-emerald" },
  lock: { label: "Fonds bloqués", icon: Lock, tone: "text-foreground/70" },
  proof_submitted: {
    label: "Justificatif",
    icon: FileCheck2,
    tone: "text-foreground/70",
  },
  release: {
    label: "Décaissement",
    icon: CheckCircle2,
    tone: "text-brand-emerald",
  },
  audit: { label: "Audit IA", icon: Sparkles, tone: "text-foreground/70" },
};

export default async function LedgerPage() {
  const [events, projects] = await Promise.all([
    getAllEvents(200),
    getProjects(),
  ]);

  const projectBySlug = new Map(projects.map((p) => [p.slug, p]));

  const totalDonationsAmount = events
    .filter((e) => e.type === "donation" && e.amount)
    .reduce((acc, e) => acc + (e.amount ?? 0), 0);
  const totalReleasesAmount = events
    .filter((e) => e.type === "release" && e.amount)
    .reduce((acc, e) => acc + (e.amount ?? 0), 0);
  const donationsCount = events.filter((e) => e.type === "donation").length;
  const releasesCount = events.filter((e) => e.type === "release").length;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-paper pt-20 pb-12">
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Registre public · lecture libre
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-sans text-5xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-6xl">
              Tout ce qui bouge,{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                en clair
              </span>
              .
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              Chaque don, chaque justificatif, chaque décaissement laisse une
              trace ici. Les hashes pointent vers les explorateurs Polygon /
              Base correspondants.
            </p>

            <div className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  k: "Reçu",
                  v: formatEUR(totalDonationsAmount, { compact: true }),
                  sub: `${donationsCount} don${donationsCount > 1 ? "s" : ""}`,
                },
                {
                  k: "Décaissé",
                  v: formatEUR(totalReleasesAmount, { compact: true }),
                  sub: `${releasesCount} virement${releasesCount > 1 ? "s" : ""}`,
                },
                {
                  k: "Événements",
                  v: String(events.length),
                  sub: "horodatés on-chain",
                },
                {
                  k: "Projets actifs",
                  v: String(projects.length),
                  sub: "tous publics",
                },
              ].map((s) => (
                <div key={s.k}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.k}
                  </p>
                  <p className="mt-3 font-serif text-4xl tracking-tight">
                    {s.v}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Flux en direct
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Tri par date · revalidé toutes les 30 s
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="hidden border-b border-border bg-muted/50 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:grid md:grid-cols-12 md:gap-4">
                <span className="md:col-span-2">Type</span>
                <span className="md:col-span-3">Projet</span>
                <span className="md:col-span-3">Détail</span>
                <span className="md:col-span-2">Hash</span>
                <span className="text-right md:col-span-1">Montant</span>
                <span className="text-right md:col-span-1">Date</span>
              </div>

              <ul className="divide-y divide-border">
                {events.map((e) => {
                  const meta = typeMeta[e.type];
                  const Icon = meta.icon;
                  const project = projectBySlug.get(e.projectSlug);
                  return (
                    <li
                      key={e.id}
                      className="group grid items-start gap-3 px-6 py-4 transition-colors hover:bg-muted/30 md:grid-cols-12 md:items-center md:gap-4"
                    >
                      <div className="flex items-center gap-2 md:col-span-2">
                        <span className={`${meta.tone}`}>
                          <Icon className="size-4" />
                        </span>
                        <span className="text-sm font-medium">
                          {meta.label}
                        </span>
                      </div>

                      <div className="md:col-span-3">
                        {project ? (
                          <Link
                            href={`/projects/${project.slug}`}
                            className="text-sm font-medium tracking-tight text-foreground underline-offset-4 hover:underline"
                          >
                            {project.title}
                          </Link>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                        {project && (
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {project.association.name} · {project.chain}
                          </p>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground md:col-span-3">
                        {e.detail}
                      </p>

                      <a
                        href="#"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground md:col-span-2"
                      >
                        {shortHash(e.txHash, 6, 4)}
                        <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>

                      <span className="font-serif text-base tracking-tight md:col-span-1 md:text-right">
                        {e.amount ? formatEUR(e.amount) : "—"}
                      </span>

                      <span className="font-mono text-[11px] text-muted-foreground md:col-span-1 md:text-right">
                        {relativeTime(e.timestamp)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {events.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <p className="text-muted-foreground">
                    Aucun événement pour l'instant.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Légende :</span>
              {(Object.entries(typeMeta) as [LedgerEventType, typeof typeMeta[LedgerEventType]][]).map(
                ([type, m]) => {
                  const Icon = m.icon;
                  return (
                    <Badge key={type} variant="outline" className="gap-1.5">
                      <Icon className={`size-3 ${m.tone}`} />
                      {m.label}
                    </Badge>
                  );
                },
              )}
              <ArrowDown className="size-3" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
