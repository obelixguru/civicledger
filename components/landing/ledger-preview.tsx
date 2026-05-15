import { ArrowDown, CheckCircle2, FileCheck2, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { LedgerEvent } from "@/lib/data/projects";
import { formatEUR, relativeTime, shortHash } from "@/lib/utils";

const typeMeta: Record<
  string,
  { label: string; icon: React.ElementType; tone: string }
> = {
  donation: { label: "Don reçu", icon: Wallet, tone: "text-brand-emerald" },
  release: { label: "Décaissement", icon: CheckCircle2, tone: "text-brand-emerald" },
  proof_submitted: { label: "Justificatif", icon: FileCheck2, tone: "text-foreground/80" },
  audit: { label: "Audit IA", icon: ArrowDown, tone: "text-foreground/80" },
  lock: { label: "Fonds bloqués", icon: ArrowDown, tone: "text-foreground/80" },
};

export function LedgerPreview({ events }: { events: LedgerEvent[] }) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-foreground/10 bg-card p-0 shadow-[0_30px_80px_-20px_rgba(15,15,14,0.18)]">
      <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-emerald-soft">
            <span className="h-2 w-2 rounded-full bg-brand-emerald animate-live" />
          </div>
          <div>
            <p className="text-sm font-medium tracking-tight">Registre public</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Polygon · Base · live
            </p>
          </div>
        </div>
        <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-[0.14em]">
          Bloc 18 924 117
        </Badge>
      </div>

      <ul className="divide-y divide-border/70">
        {events.slice(0, 5).map((evt) => {
          const meta = typeMeta[evt.type];
          const Icon = meta.icon;
          return (
            <li
              key={evt.id}
              className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-muted/40"
            >
              <div className={`mt-0.5 ${meta.tone}`}>
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium">
                    {meta.label}
                    {evt.amount ? (
                      <span className="ml-2 font-serif text-base">
                        {formatEUR(evt.amount)}
                      </span>
                    ) : null}
                  </p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {relativeTime(evt.timestamp)}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {evt.detail}
                </p>
                <p className="mt-1.5 truncate font-mono text-[10px] text-muted-foreground/70">
                  {shortHash(evt.txHash, 10, 8)} · {evt.actor}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-border/70 bg-muted/30 px-6 py-3 text-[11px] text-muted-foreground">
        <span className="font-mono uppercase tracking-[0.14em]">
          {events.length} événements · dernières 4 h
        </span>
        <span className="text-foreground/70">Voir le registre →</span>
      </div>
    </Card>
  );
}
