import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Clock,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ApplicationForm } from "@/components/applications/application-form";

export const metadata: Metadata = {
  title: "Pour les associations",
  description:
    "Tu portes une cause vérifiable. On porte ta crédibilité. Dépose ta candidature CivicLedger en 5 minutes — réponse en 7 jours.",
};

const benefits = [
  {
    icon: BadgeCheck,
    title: "Crédibilité instantanée",
    body: "Le badge « Vérifiée on-chain » et ton score de transparence rassurent les donneurs dès la première seconde — comme un Trustpilot, mais cryptographiquement signé.",
  },
  {
    icon: Sparkles,
    title: "L'IA structure tes projets",
    body: "Tu décris ton besoin, l'IA propose un budget benchmarké, des étapes scorables, et un dossier prêt à publier. Plus de paperasse pour candidater à des appels à projets — il est déjà fait.",
  },
  {
    icon: FileText,
    title: "Justificatifs simplifiés",
    body: "Photo, scan, géoloc — l'app te guide. Tu envoies, l'IA pré-valide en quelques heures. Pas de comptable obligatoire pour débloquer le décaissement.",
  },
  {
    icon: ShieldCheck,
    title: "Données protégées",
    body: "Conformité RGPD, hébergement EU (Supabase Paris). Tes dossiers d'audit sont chiffrés, et seul·e ton·ta référent·e CivicLedger les voit en clair.",
  },
];

const criteria = [
  "Personne morale enregistrée — loi 1901 (FR), ASBL (BE), Verein (DE), association déclarée (équivalent international)",
  "Au moins 12 mois d'activité documentée (rapport moral, bilan, ou équivalent)",
  "Compte bancaire dédié à la personne morale (pas un compte personnel)",
  "Mandataire identifié·e avec pièce d'identité",
  "Engagement à maintenir ≥ 10 % des fonds reçus dans le flux traçable et scorable de CivicLedger",
];

export default function ForAssociationsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-paper pt-24 pb-20">
          <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-6">
                <Badge variant="outline" className="mb-7 gap-2 px-3 py-1">
                  <Clock className="size-3" />
                  <span className="font-mono uppercase tracking-[0.14em]">
                    Réponse en 7 jours ouvrés
                  </span>
                </Badge>
                <h1 className="text-balance font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.025em]">
                  Tu portes une cause.{" "}
                  <span className="font-serif italic font-normal text-brand-emerald">
                    On porte ta crédibilité
                  </span>
                  .
                </h1>
                <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  Rejoins les{" "}
                  <span className="text-foreground">47 associations vérifiées</span>{" "}
                  qui collectent en transparence totale. Audit IA + humain, smart
                  contract dédié, justificatifs simplifiés, zéro frais d'inscription.
                </p>

                <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border/60 pt-8">
                  {[
                    { k: "Inscription", v: "0 €" },
                    { k: "Délai instruction", v: "7 j" },
                    { k: "Score initial moyen", v: "82/100" },
                  ].map((s) => (
                    <div key={s.k}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                        {s.k}
                      </dt>
                      <dd className="mt-1.5 font-serif text-2xl tracking-tight">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="lg:col-span-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((b) => {
                    const Icon = b.icon;
                    return (
                      <div
                        key={b.title}
                        className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/15"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-emerald-soft text-brand-emerald">
                          <Icon className="size-5" />
                        </div>
                        <h3 className="mt-5 text-base font-semibold tracking-tight">
                          {b.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {b.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Critères d'éligibilité
                </p>
                <h2 className="mt-4 text-balance font-sans text-3xl font-medium leading-tight tracking-[-0.02em] sm:text-4xl">
                  On ne prend{" "}
                  <span className="font-serif italic font-normal">
                    pas tout le monde
                  </span>
                  .
                </h2>
                <p className="mt-5 text-sm text-muted-foreground">
                  La confiance des donneurs dépend de la rigueur du filtre. Voici
                  les cinq exigences non négociables.
                </p>
                <Link
                  href="/charter"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Lire la charte d'engagement →
                </Link>
              </div>

              <ul className="space-y-4 lg:col-span-8">
                {criteria.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
                  >
                    <span className="mt-0.5 font-mono text-[11px] tracking-widest text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-pretty text-sm leading-relaxed text-foreground">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative bg-paper py-24" id="apply">
          <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-brand-emerald/40 to-transparent" />
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Candidater · 5 minutes
            </p>
            <h2 className="mt-4 text-balance text-center font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
              Dépose ton{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                dossier
              </span>
              .
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-base text-muted-foreground">
              Si on te répond positivement, ton·ta référent·e CivicLedger te
              recontactera pour les statuts, le bilan et la pièce d'identité du
              mandataire.
            </p>

            <Separator className="my-12" />

            <ApplicationForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
