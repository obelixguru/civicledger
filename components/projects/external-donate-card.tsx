import { ArrowUpRight, BadgeCheck, ExternalLink, ShieldCheck, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Project } from "@/lib/data/projects";
import { formatEUR, formatNumber } from "@/lib/utils";

function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ExternalDonateCard({ project }: { project: Project }) {
  const pct = Math.min(100, Math.round((project.raised / project.goal) * 100));
  const a = project.association;

  const dimensions = [
    { k: "Trust Score", v: a.trustScore !== null ? `${a.trustScore}/100` : "—" },
    { k: "Score global", v: a.overallScore !== null ? `${a.overallScore}/100` : "—" },
    { k: "Grade Pulse", v: a.grade ?? "—" },
  ];

  return (
    <>
      <Card className="overflow-hidden p-0 shadow-[0_30px_80px_-25px_rgba(15,15,14,0.18)]">
        <div className="border-b border-border p-7">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
            <ShieldCheck className="size-3 text-brand-emerald" />
            Source externe · vérifiée par notre scoring
          </div>

          <div className="mt-5 flex items-baseline justify-between">
            <p className="font-serif text-5xl tracking-tight">
              {formatEUR(project.raised, { compact: true })}
            </p>
            <span className="text-sm text-muted-foreground">
              / {formatEUR(project.goal, { compact: true })}
            </span>
          </div>
          <Progress value={pct} className="mt-4 h-2" />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">{pct}%</span>{" "}
              collectés
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" />
              {formatNumber(project.donors)} donneurs
            </span>
          </div>
        </div>

        <div className="p-7">
          <Button
            asChild
            variant="emerald"
            size="xl"
            className="w-full"
          >
            <a
              href={project.externalUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Donner sur {a.website ? hostFromUrl(a.website) : "le site officiel"}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            {project.externalDonationMethod ?? "Carte / chèque / virement"} ·
            reçu fiscal envoyé directement par l'association
          </p>
        </div>

        <div className="border-t border-border bg-muted/40 px-7 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Notation Pulse de l'association
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {dimensions.map((d) => (
              <div key={d.k}>
                <p className="text-[10px] text-muted-foreground">{d.k}</p>
                <p className="mt-0.5 font-serif text-lg tracking-tight">{d.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {a.donEnConfiance && (
              <Badge variant="emerald">
                <BadgeCheck className="size-3" />
                Don en Confiance
              </Badge>
            )}
            {a.website && (
              <a
                href={a.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {hostFromUrl(a.website)}
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        </div>
      </Card>

      <div className="mt-4 rounded-2xl border border-dashed border-border bg-card/60 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Pourquoi tu donnes sur leur site et pas chez nous ?
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette association n'a pas (encore) hébergé de projet sur CivicLedger.
          On la met en avant parce que son score Pulse est élevé. Quand elle
          décidera de lancer un projet on-chain ici, tu pourras y suivre chaque
          euro.
        </p>
      </div>
    </>
  );
}
