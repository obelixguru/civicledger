import Link from "next/link";
import { ArrowRight, BadgeCheck, FileText, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BadgeCheck,
    title: "Crédibilité instantanée",
    body: "Le badge « Vérifiée on-chain » et ton score de transparence rassurent les donneurs dès la première seconde.",
  },
  {
    icon: Sparkles,
    title: "L'IA structure tes projets",
    body: "Tu décris ton besoin, l'IA propose un budget benchmarké, des étapes scorables, et un dossier prêt à publier.",
  },
  {
    icon: FileText,
    title: "Justificatifs simplifiés",
    body: "Photo, scan, géoloc — l'app te guide. Pas de paperasse compliquée pour débloquer les fonds.",
  },
];

export function AssociationsCTA() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 30%, color-mix(in oklch, var(--brand-emerald) 40%, transparent), transparent 50%), radial-gradient(at 80% 70%, color-mix(in oklch, var(--brand-amber) 22%, transparent), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-background/60">
              Pour les associations
            </p>
            <h2 className="mt-4 text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
              Tu portes une cause.{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                On porte ta crédibilité
              </span>
              .
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-base text-background/70 sm:text-lg">
              Si tu es une association loi 1901 (ou équivalent) avec au moins 12
              mois d'activité, tu peux déposer un dossier. Réponse en 7 jours
              ouvrés.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild variant="emerald" size="xl">
                <Link href="/for-associations">
                  Demander la vérification
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="xl"
                className="text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/charter">Lire la charte</Link>
              </Button>
            </div>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-background/50">
              47 associations vérifiées · 7 j de délai moyen · 0 € de frais
              d'inscription
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-emerald/15 text-brand-emerald">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-background/65">{f.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-background/60">
                    Engagement obligatoire
                  </p>
                  <p className="mt-2 max-w-md text-pretty text-sm text-background/80">
                    Au moins 10 % des fonds reçus doivent rester traçables et
                    scorables, justificatifs à l'appui. C'est ce qui garantit la
                    confiance pour toutes.
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-5xl tracking-tight text-brand-emerald">
                    10 %
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-background/60">
                    plancher
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
