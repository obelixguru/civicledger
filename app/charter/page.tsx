import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Charte d'engagement",
  description:
    "Charte d'engagement CivicLedger — les règles non négociables pour les associations vérifiées.",
};

const articles = [
  {
    n: "Article 1",
    title: "Transparence absolue sur les fonds collectés via la plateforme",
    body: "Chaque euro reçu via CivicLedger est tracé on-chain, du paiement carte au virement fournisseur. L'association renonce à toute opposition à la publication des hashes de transaction, des montants, des justificatifs validés, et de son score de transparence.",
  },
  {
    n: "Article 2",
    title: "Plancher de 10 % minimum de fonds traçables",
    body: "L'association s'engage à maintenir, sur la durée de son adhésion à la plateforme, au moins 10 % de l'ensemble de ses recettes annuelles dans le circuit traçable et scorable de CivicLedger. En deçà, le badge « Vérifiée on-chain » est suspendu jusqu'à régularisation.",
  },
  {
    n: "Article 3",
    title: "Justification de chaque décaissement",
    body: "Aucun décaissement n'est libéré sans facture nominative, photo ou vidéo de livraison datée et géolocalisée quand applicable, et co-validation IA + modération humaine. Les justificatifs sont ancrés on-chain via leur empreinte cryptographique.",
  },
  {
    n: "Article 4",
    title: "Honnêteté budgétaire à la publication",
    body: "L'association s'engage à publier des budgets cohérents avec les prix de marché, à signaler tout poste de dépense indirect (frais administratifs, salaires, communication), et à ne pas surdimensionner artificiellement un projet. Toute manipulation manifeste entraîne suspension et publication motivée.",
  },
  {
    n: "Article 5",
    title: "Conflits d'intérêts déclarés",
    body: "Tout lien direct ou indirect entre un·e mandataire de l'association et un fournisseur retenu pour un projet doit être déclaré au moment de la soumission du justificatif. Le non-respect entraîne le gel des décaissements et une procédure contradictoire.",
  },
  {
    n: "Article 6",
    title: "Coopération en cas d'audit",
    body: "L'association s'engage à fournir, sur demande de Mazars ou de tout auditeur mandaté par CivicLedger, l'accès en lecture à ses pièces comptables relatives aux projets passés par la plateforme, dans un délai raisonnable.",
  },
  {
    n: "Article 7",
    title: "Sanction et radiation",
    body: "Le non-respect d'un article entraîne, selon la gravité, l'un des éléments suivants : ajustement immédiat du score de transparence, suspension temporaire de la publication de nouveaux projets, gel des décaissements en cours, ou radiation définitive avec remboursement automatique des donneurs concernés.",
  },
];

export default function CharterPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-paper pt-24 pb-16">
          <div className="absolute inset-0 bg-mesh opacity-30" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Charte d'engagement · v1.0
            </p>
            <h1 className="mt-4 text-balance font-sans text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.025em]">
              Les{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                sept articles
              </span>{" "}
              que chaque association vérifiée accepte.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              Cette charte fait partie intégrante du contrat d'adhésion à
              CivicLedger. Elle est rédigée en français, conserve sa valeur
              originale, et prévaut sur toute traduction.
            </p>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto max-w-3xl px-6">
            <Separator />
            <dl className="divide-y divide-border">
              {articles.map((a) => (
                <div key={a.n} className="py-10">
                  <dt>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {a.n}
                    </p>
                    <p className="mt-3 text-balance font-serif text-2xl tracking-tight">
                      {a.title}
                    </p>
                  </dt>
                  <dd className="mt-5 text-pretty text-base leading-relaxed text-foreground">
                    {a.body}
                  </dd>
                </div>
              ))}
            </dl>

            <Separator />

            <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/30 p-6">
              <p className="text-sm text-muted-foreground">
                Cette charte évolue. Les changements sont versionnés et
                communiqués à l'ensemble des associations au moins 30 jours
                avant entrée en vigueur. La version en cours fait foi.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-paper py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-balance font-sans text-3xl font-medium leading-tight tracking-[-0.02em] sm:text-4xl">
              Tu acceptes ces sept points ?
            </h2>
            <p className="mt-4 text-pretty text-base text-muted-foreground">
              Alors candidate. Si on te répond positivement, la signature de
              cette charte sera la dernière étape avant publication.
            </p>
            <Button asChild variant="emerald" size="xl" className="mt-8">
              <Link href="/for-associations#apply">
                Déposer un dossier
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
