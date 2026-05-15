import { platformStats } from "@/lib/data/stats";
import { formatEUR, formatNumber } from "@/lib/utils";

const items = [
  {
    label: "Distribué cette année",
    value: formatEUR(platformStats.totalDistributed, { compact: true }),
    sub: "vers le terrain, justifié",
  },
  {
    label: "Associations vérifiées",
    value: String(platformStats.associationsVerified),
    sub: "audit IA + humain",
  },
  {
    label: "Score de traçabilité moyen",
    value: `${platformStats.averageTraceability}/100`,
    sub: "recalculé en temps réel",
  },
  {
    label: "Donneurs actifs",
    value: formatNumber(platformStats.donorsCount, { compact: true }),
    sub: "depuis le lancement",
  },
];

export function StatsBand() {
  return (
    <section className="relative border-y border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-3 font-serif text-5xl tracking-tight text-foreground">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
