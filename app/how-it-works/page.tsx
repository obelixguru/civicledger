import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  CreditCard,
  Lock,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "Du clic au terrain : le workflow complet d'une donation CivicLedger, étape par étape, avec les garde-fous techniques.",
};

const steps = [
  {
    n: "01",
    icon: Brain,
    actor: "Plateforme · IA d'audit",
    title: "L'association passe le filtre",
    body: "Statuts, comptes annuels, rapport moral, historique. L'IA recalcule un score initial, un modérateur humain valide. Tant que le score n'atteint pas notre seuil, l'asso n'a pas accès à la publication. Aucune exception.",
    detail:
      "Score de fiabilité — 0/100 à 100/100 — combinant ancienneté, qualité documentaire, cohérence budgétaire et signaux externes (presse, RNA, registre).",
  },
  {
    n: "02",
    icon: ScrollText,
    actor: "Association · IA assistance",
    title: "Le projet est structuré et scoré",
    body: "L'asso décrit son besoin. L'IA propose un budget benchmarké contre des projets similaires, casse en étapes scorables, et flagge tout ce qui paraît incohérent. Le projet ne se publie que lorsque les étapes sont explicites et le budget plausible.",
    detail:
      "Chaque ligne du budget est attachée à un livrable. Un poste mal défini = pas de publication.",
  },
  {
    n: "03",
    icon: CreditCard,
    actor: "Donneur",
    title: "Tu paies par carte, comme partout",
    body: "Stripe encaisse en EUR. Aucun wallet à installer, aucune clé privée à garder. UX identique à un don associatif classique. Le ticket Stripe sert de reçu fiscal pré-rempli.",
    detail:
      "Frais réels : 2,9 % couvrant Stripe + Circle + smart contract. CivicLedger ne prend aucune commission.",
  },
  {
    n: "04",
    icon: Lock,
    actor: "Circle · Smart contract",
    title: "Conversion EUR → stablecoin, fonds verrouillés",
    body: "Circle mint la valeur équivalente en EURC (Polygon) ou USDC (Base). Les tokens sont envoyés au smart contract dédié à ce projet précis. À partir de cet instant, ni l'asso, ni nous, ni Stripe ne peuvent toucher aux fonds sans preuve.",
    detail:
      "Le contrat est inspectable publiquement. Adresse listée sur chaque page projet.",
  },
  {
    n: "05",
    icon: ShieldCheck,
    actor: "Association · IA + modérateur",
    title: "L'association soumet les justificatifs",
    body: "Facture, photo géolocalisée et datée, bon de livraison. L'IA compare la facture au budget annoncé et au prix du marché. Un modérateur humain confirme. Le score de transparence du projet est recalculé.",
    detail:
      "Justificatifs ancrés on-chain via leur hash IPFS — immuables. Refus possible : argent reste verrouillé.",
  },
  {
    n: "06",
    icon: CheckCircle2,
    actor: "Smart contract → fournisseur",
    title: "Décaissement, idéalement vers le fournisseur",
    body: "Le contrat libère le montant validé, Circle reconvertit en EUR, virement émis. Quand c'est possible, on paie directement le fournisseur (papeterie, BTP, banque alimentaire) pour réduire encore les manipulations intermédiaires.",
    detail:
      "Délai moyen carte → décaissement : 4,2 j. Chaque étape laisse un ledger_event horodaté.",
  },
];

const guarantees = [
  {
    title: "Garantie remboursement 90 j",
    body: "Si l'asso ne soumet aucune preuve dans les 90 jours suivant la fin de campagne, le smart contract rembourse automatiquement les donneurs sur leur carte d'origine.",
  },
  {
    title: "Score recalculé après chaque décaissement",
    body: "Si un justificatif est tendu, le score baisse instantanément et la visibilité de l'asso aussi. À l'inverse, un dossier impeccable monte le score.",
  },
  {
    title: "Audit annuel indépendant",
    body: "Mazars audite nos comptes et nos smart contracts une fois par an. Le rapport est publié intégralement, sans biais.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-paper pt-24 pb-20">
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <Badge variant="outline" className="mb-7 gap-2 px-3 py-1">
              <Sparkles className="size-3" />
              <span className="font-mono uppercase tracking-[0.14em]">
                Workflow de bout en bout
              </span>
            </Badge>
            <h1 className="text-balance font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.025em]">
              Du clic à la livraison,{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                six étapes
              </span>{" "}
              vérifiables.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg text-muted-foreground">
              Chaque étape laisse une trace cryptographique. Chaque transition
              de fonds est gated. Tu peux ouvrir n'importe quel hash et vérifier
              toi-même.
            </p>
          </div>
        </section>

        <section className="relative bg-background py-20">
          <div className="mx-auto max-w-5xl px-6">
            <ol className="relative">
              <div
                className="absolute left-[1.4rem] top-12 bottom-12 w-px bg-gradient-to-b from-brand-emerald/40 via-border to-brand-emerald/40"
                aria-hidden
              />
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.n}
                    className="relative grid gap-6 py-10 lg:grid-cols-12 lg:gap-10"
                  >
                    <div className="relative flex items-start gap-5 lg:col-span-4">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-emerald/25 bg-brand-emerald-soft text-brand-emerald">
                        <Icon className="size-5" />
                      </div>
                      <div className="pt-1.5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Étape {step.n}
                        </p>
                        <h2 className="mt-2 text-2xl font-medium tracking-tight">
                          {step.title}
                        </h2>
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                          {step.actor}
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-8 lg:pl-2">
                      <p className="text-pretty text-base leading-relaxed text-foreground">
                        {step.body}
                      </p>
                      <div className="mt-4 border-l-2 border-brand-emerald/40 bg-muted/30 px-5 py-3 text-sm text-muted-foreground">
                        {step.detail}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="relative bg-paper py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Les garde-fous
            </p>
            <h2 className="mt-4 max-w-2xl text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
              Ce qui se passe{" "}
              <span className="font-serif italic font-normal">
                quand ça part mal
              </span>
              .
            </h2>

            <Separator className="mt-10" />

            <dl className="divide-y divide-border">
              {guarantees.map((g, i) => (
                <div
                  key={g.title}
                  className="grid gap-4 py-8 sm:grid-cols-12 sm:gap-8"
                >
                  <dt className="sm:col-span-5">
                    <span className="mr-3 font-mono text-[11px] tracking-widest text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-balance text-base font-medium tracking-tight">
                      {g.title}
                    </span>
                  </dt>
                  <dd className="text-pretty text-sm leading-relaxed text-muted-foreground sm:col-span-7">
                    {g.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-background py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
              Prêt·e à donner{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                avec preuve
              </span>{" "}
              ?
            </h2>
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
      </main>
      <SiteFooter />
    </>
  );
}
