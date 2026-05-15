import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-brand-emerald/40 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Donne avec preuve
        </p>
        <h2 className="mt-5 text-balance font-sans text-5xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
          La générosité mérite{" "}
          <span className="font-serif italic font-normal text-brand-emerald">
            mieux que la confiance aveugle
          </span>
          .
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-pretty text-lg text-muted-foreground">
          Choisis un projet, donne par carte, vérifie où va ton euro. C'est
          tout.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="emerald" size="xl">
            <Link href="/projects">
              Parcourir les projets
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link href="/ledger">Ouvrir le registre public</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
