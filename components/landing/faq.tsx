import { faqItems } from "@/lib/data/stats";

export function FAQ() {
  return (
    <section className="relative bg-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Questions fréquentes
            </p>
            <h2 className="mt-4 text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
              On{" "}
              <span className="font-serif italic font-normal">répond</span>{" "}
              à tout, sans esquive.
            </h2>
            <p className="mt-6 max-w-md text-pretty text-base text-muted-foreground">
              Une autre question ? Écris-nous à{" "}
              <a
                href="mailto:hello@civicledger.app"
                className="text-foreground underline underline-offset-4 hover:text-brand-emerald"
              >
                hello@civicledger.app
              </a>
              . Réponse sous 24 h.
            </p>
          </div>

          <div className="lg:col-span-8">
            <dl className="divide-y divide-border border-y border-border">
              {faqItems.map((item, i) => (
                <div
                  key={item.q}
                  className="grid gap-4 py-7 sm:grid-cols-12 sm:gap-8"
                >
                  <dt className="sm:col-span-5">
                    <span className="mr-3 font-mono text-[11px] tracking-widest text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-balance text-base font-medium tracking-tight text-foreground">
                      {item.q}
                    </span>
                  </dt>
                  <dd className="text-pretty text-sm leading-relaxed text-muted-foreground sm:col-span-7">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
