import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Separator } from "@/components/ui/separator";

const columns = [
  {
    title: "Plateforme",
    links: [
      { label: "Projets en cours", href: "/projects" },
      { label: "Registre public", href: "/ledger" },
      { label: "Comment ça marche", href: "/how-it-works" },
      { label: "Score de transparence", href: "/scoring" },
    ],
  },
  {
    title: "Associations",
    links: [
      { label: "Demander une vérification", href: "/for-associations" },
      { label: "Charte d'engagement", href: "/charter" },
      { label: "Documentation", href: "/docs" },
      { label: "API publique", href: "/api" },
    ],
  },
  {
    title: "Confiance",
    links: [
      { label: "Audit Mazars 2025", href: "/audit" },
      { label: "Smart contracts", href: "/contracts" },
      { label: "RGPD", href: "/privacy" },
      { label: "CGU", href: "/terms" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Presse", href: "/press" },
      { label: "Partenariats", href: "/partners" },
      { label: "Carrières", href: "/jobs" },
      { label: "hello@civicledger.app", href: "mailto:hello@civicledger.app" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-paper">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-pretty text-sm text-muted-foreground">
              Plateforme de dons certifiés on-chain. Paiement par carte,
              traçabilité au centime près, audit IA des associations.
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              Powered by
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span>Stripe</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Circle</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Polygon</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Base</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Vercel</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} CivicLedger. Association loi 1901, Paris.
          </p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-live rounded-full bg-brand-emerald opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-emerald" />
              </span>
              Registre public ouvert
            </span>
            <span className="font-mono">v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
