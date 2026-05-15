import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Project } from "@/lib/data/projects";
import { formatEUR, formatNumber } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const pct = Math.min(100, Math.round((project.raised / project.goal) * 100));
  const isNative = project.source === "civicledger_native";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus-visible:outline-none"
    >
      <Card
        className={`flex h-full flex-col overflow-hidden p-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_70px_-25px_rgba(15,15,14,0.22)] group-focus-visible:ring-2 group-focus-visible:ring-ring ${
          isNative
            ? "border-brand-emerald/40 ring-1 ring-brand-emerald/20"
            : "border-border group-hover:border-foreground/15"
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            aria-hidden
          />
          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-white/20 bg-black/30 text-white backdrop-blur-sm"
            >
              {project.category}
            </Badge>
            {isNative ? (
              <Badge className="border-transparent bg-brand-emerald text-brand-paper shadow-[0_4px_20px_-4px_color-mix(in_oklch,var(--brand-emerald)_60%,transparent)]">
                <Sparkles className="size-3" />
                CIVIC LEDGER
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-white/20 bg-black/30 text-white backdrop-blur-sm"
              >
                <ShieldCheck className="size-3" />
                Vérifiée
              </Badge>
            )}
          </div>
          <div className="absolute right-4 top-4">
            {isNative ? (
              <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald animate-live" />
                <span className="font-mono tracking-[0.1em]">
                  on-chain · {project.transparencyScore}/100
                </span>
              </div>
            ) : project.association.trustScore ? (
              <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
                <span className="font-mono tracking-[0.1em]">
                  Pulse {project.association.trustScore}/100
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              {project.association.name}
            </span>
            <span>·</span>
            <span>{project.association.location}</span>
          </div>

          <h3 className="mt-3 text-balance text-lg font-semibold leading-snug tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-pretty text-sm text-muted-foreground">
            {project.tagline}
          </p>

          <div className="mt-5 space-y-3">
            <Progress value={pct} />
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-serif text-2xl tracking-tight text-foreground">
                  {formatEUR(project.raised, { compact: true })}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  sur {formatEUR(project.goal, { compact: true })} · {pct}%
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="size-3.5" />
                {formatNumber(project.donors)} donneurs
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
            {isNative ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono uppercase tracking-[0.14em]">
                  {project.chain} · {project.stablecoin}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {project.association.donEnConfiance && (
                  <span className="font-mono uppercase tracking-[0.14em]">
                    Don en Confiance
                  </span>
                )}
                {!project.association.donEnConfiance && (
                  <span className="font-mono uppercase tracking-[0.14em]">
                    {project.association.grade
                      ? `Grade ${project.association.grade}`
                      : "Source externe"}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground transition-transform group-hover:translate-x-0.5">
              <span>{isNative ? "Donner" : "Voir"}</span>
              <ArrowUpRight className="size-3.5" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
