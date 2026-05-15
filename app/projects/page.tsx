import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectCard } from "@/components/projects/project-card";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projets vérifiés",
  description:
    "Tous les projets associatifs vérifiés et traçables on-chain disponibles sur CivicLedger.",
};

export const revalidate = 60;

const categories = [
  "Tous",
  "Éducation",
  "Santé",
  "Eau",
  "Alimentation",
  "Climat",
  "Logement",
];

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-paper pt-20 pb-16">
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Catalogue · {projects.length} projets · Pulse ≥ 70/100
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-sans text-5xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-6xl">
              10 associations vérifiées,{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                un pilote on-chain
              </span>
              .
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              Sur les 11 projets ci-dessous, dix sont portés par des
              associations existantes au score Pulse ≥ 70/100 (don sur leur
              propre site). Le projet badgé{" "}
              <span className="font-medium text-brand-emerald">CIVIC LEDGER</span>{" "}
              est notre pilote — paiement par carte, traçabilité on-chain au
              centime.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-2">
              {categories.map((cat, i) => (
                <Badge
                  key={cat}
                  variant={i === 0 ? "default" : "outline"}
                  className="cursor-pointer px-4 py-1.5 text-xs"
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
