import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LedgerPreview } from "@/components/landing/ledger-preview";
import type { LedgerEvent } from "@/lib/data/projects";

export function Hero({ events }: { events: LedgerEvent[] }) {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 lg:pt-28 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <Badge
              variant="outline"
              className="mb-7 gap-2 border-foreground/15 bg-background/60 px-3 py-1 text-[11px] backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-live rounded-full bg-brand-emerald opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-emerald" />
              </span>
              <span className="font-mono uppercase tracking-[0.14em]">
                Registre public · v0.1
              </span>
              <span className="text-muted-foreground">
                · 1 240 000 € distribués cette année
              </span>
            </Badge>

            <h1 className="text-balance font-sans text-[clamp(2.75rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.03em]">
              Chaque don,{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                vérifiable
              </span>{" "}
              au centime près.
            </h1>

            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Tu donnes par carte, on convertit en stablecoin, le contrat
              libère les fonds uniquement contre justificatif.{" "}
              <span className="text-foreground">
                La confiance de la blockchain, la simplicité d'un paiement
                Stripe.
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild variant="emerald" size="xl">
                <Link href="/projects">
                  Découvrir les projets vérifiés
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/how-it-works">
                  Voir comment ça marche
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8">
              {[
                { k: "Score moyen", v: "97/100", sub: "transparence" },
                { k: "Délai moyen", v: "4,2 j", sub: "décaissement" },
                { k: "Frais", v: "2,9 %", sub: "couvre Stripe + Circle" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                    {s.k}
                  </dt>
                  <dd className="mt-1.5 font-serif text-3xl tracking-tight text-foreground">
                    {s.v}
                  </dd>
                  <dd className="mt-0.5 text-xs text-muted-foreground">
                    {s.sub}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-5">
            <div
              className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-brand-emerald/15 via-transparent to-brand-amber/10 blur-2xl"
              aria-hidden
            />
            <LedgerPreview events={events} />
            <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-3" />
              Mise à jour en direct depuis le smart contract
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
