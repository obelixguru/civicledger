import { trustLogos } from "@/lib/data/stats";

export function TrustStrip() {
  const items = [...trustLogos, ...trustLogos];
  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-7 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Infrastructure auditée · partenaires de confiance
        </p>
        <div className="relative">
          <div
            className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
            aria-hidden
          />
          <div className="overflow-hidden">
            <ul className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
              {items.map((logo, i) => (
                <li
                  key={`${logo.name}-${i}`}
                  className="flex items-baseline gap-2 text-foreground/70"
                >
                  <span className="font-serif text-2xl tracking-tight text-foreground">
                    {logo.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {logo.role}
                  </span>
                  <span className="ml-12 inline-block h-1 w-1 rounded-full bg-border" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
