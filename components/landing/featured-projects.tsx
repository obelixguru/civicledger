import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/lib/data/projects";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 3);
  return (
    <section className="relative bg-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Sélection éditoriale · scoring Pulse ≥ 70/100
            </p>
            <h2 className="mt-4 text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
              Un pilote on-chain,{" "}
              <span className="font-serif italic font-normal">
                deux ONG vérifiées
              </span>
              .
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-sm text-muted-foreground">
              On démarre en mettant en avant des associations existantes au
              score Pulse élevé — tu donnes sur leur site. Le projet
              <span className="text-brand-emerald"> CIVIC LEDGER </span>
              est notre pilote on-chain : tu donnes par carte, on te prouve où
              chaque euro va.
            </p>
          </div>
          <Button asChild variant="ghost" size="lg" className="self-start sm:self-end">
            <Link href="/projects">
              Voir tout le catalogue
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
