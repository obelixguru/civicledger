import {
  Brain,
  CreditCard,
  Lock,
  ScrollText,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Brain,
    title: "Audit IA de l'association",
    body: "Statuts, comptes, historique. Un score de fiabilité initial est calculé. Aucune publication tant qu'elle n'a pas passé le seuil.",
    actor: "Plateforme",
  },
  {
    n: "02",
    icon: CreditCard,
    title: "Tu donnes par carte bancaire",
    body: "Stripe encaisse en EUR. Aucun wallet à installer, aucune crypto à comprendre. UX identique à un don classique.",
    actor: "Donneur",
  },
  {
    n: "03",
    icon: Lock,
    title: "Conversion EUR → EURC, fonds bloqués on-chain",
    body: "Circle mint le stablecoin équivalent. Le smart contract du projet le verrouille. Personne ne peut retirer sans preuve.",
    actor: "Smart contract",
  },
  {
    n: "04",
    icon: ScrollText,
    title: "L'association soumet ses justificatifs",
    body: "Facture, photo géolocalisée, livraison datée. L'IA et un modérateur vérifient la cohérence avec le budget annoncé.",
    actor: "Association",
  },
  {
    n: "05",
    icon: CheckCircle2,
    title: "Décaissement vers le fournisseur",
    body: "Le contrat libère, Circle reconvertit en EUR, virement direct au fournisseur quand possible. Toi, tu vois tout en clair.",
    actor: "Smart contract → fiat",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Le workflow de la confiance
          </p>
          <h2 className="mt-4 text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
            Du clic à la livraison,{" "}
            <span className="font-serif italic font-normal text-brand-emerald">
              cinq étapes
            </span>{" "}
            traçables.
          </h2>
          <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
            On ne te demande pas de faire confiance à une association. On te
            donne les outils pour la vérifier en temps réel.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-5 lg:gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="group relative">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_20px_50px_-20px_rgba(15,15,14,0.18)]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-emerald-soft text-brand-emerald">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-muted-foreground/70">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="mt-6 text-balance text-base font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm text-muted-foreground">
                    {step.body}
                  </p>
                  <div className="mt-auto pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                      Acteur · {step.actor}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
                    aria-hidden
                  >
                    <div className="h-px w-4 bg-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground">Garde-fou.</span> Si aucune preuve
            n'est soumise dans les 90 jours, le smart contract rembourse
            automatiquement les donneurs sur leur carte d'origine.
          </p>
        </div>
      </div>
    </section>
  );
}
