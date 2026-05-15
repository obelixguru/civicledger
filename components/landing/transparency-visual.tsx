import {
  ArrowDown,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  Lock,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatEUR, shortHash } from "@/lib/utils";

const journey = [
  {
    icon: CreditCard,
    title: "15 mai · 12:18",
    sub: "Tu donnes 50 € par carte",
    detail: "Stripe encaisse · ID pi_3Qx9K2P8sN1ZR4Y2",
    accent: false,
  },
  {
    icon: Wallet,
    title: "15 mai · 12:18",
    sub: "Mint de 50 EURC",
    detail: "Circle convertit 1:1 · tx 0x9a2f8e1b…6d",
    accent: false,
  },
  {
    icon: Lock,
    title: "15 mai · 12:19",
    sub: "Fonds verrouillés on-chain",
    detail: "Smart contract « Maraude Lyon » · Polygon",
    accent: true,
  },
  {
    icon: FileCheck2,
    title: "17 mai · 09:42",
    sub: "L'association soumet la facture",
    detail: "INV-2026-118 · Boulangerie Centrale · 1 240 €",
    accent: false,
  },
  {
    icon: CheckCircle2,
    title: "17 mai · 14:05",
    sub: "Décaissement validé, virement émis",
    detail: "Tes 50 € → 50 EURC → 50 € sur le compte fournisseur",
    accent: true,
  },
];

export function TransparencyVisual() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(at 80% 20%, color-mix(in oklch, var(--brand-emerald) 8%, transparent), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              La traçabilité, démontrée
            </p>
            <h2 className="mt-4 text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
              Tes 50 €,{" "}
              <span className="font-serif italic font-normal text-brand-emerald">
                suivis du clic à l'assiette
              </span>
              .
            </h2>
            <p className="mt-6 text-pretty text-base text-muted-foreground sm:text-lg">
              Chaque don génère une chaîne d'événements horodatés et signés. Tu
              peux ouvrir n'importe quelle transaction sur l'explorateur public,
              vérifier la facture, voir la photo de livraison.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  k: "On-chain",
                  v: "Polygon · Base",
                  d: "Frais < 0,01 €/tx, finalité < 2 s",
                },
                {
                  k: "Justificatifs",
                  v: "Hash IPFS",
                  d: "Factures et photos ancrées on-chain, immuables",
                },
                {
                  k: "Audit",
                  v: "IA + humain",
                  d: "Score recalculé à chaque décaissement",
                },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-start justify-between gap-6 border-t border-border pt-5"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {row.k}
                    </p>
                    <p className="mt-1 font-serif text-2xl tracking-tight">
                      {row.v}
                    </p>
                  </div>
                  <p className="max-w-[60%] text-right text-sm text-muted-foreground">
                    {row.d}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-emerald/10 via-transparent to-brand-amber/8 blur-2xl"
                aria-hidden
              />
              <div className="relative rounded-3xl border border-border bg-card p-2">
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
                      <span className="font-mono text-[10px] font-bold">CL</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Don #DN-2026-04812
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        Maraude Lyon · 50 €
                      </p>
                    </div>
                  </div>
                  <Badge variant="emerald">
                    <CheckCircle2 className="size-3" />
                    Décaissé
                  </Badge>
                </div>

                <ol className="relative px-5 py-6">
                  <div
                    className="absolute left-[2.4rem] top-10 bottom-10 w-px bg-gradient-to-b from-brand-emerald via-border to-brand-emerald"
                    aria-hidden
                  />
                  {journey.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <li
                        key={i}
                        className="relative flex items-start gap-4 py-3.5"
                      >
                        <div
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                            step.accent
                              ? "border-brand-emerald/30 bg-brand-emerald-soft text-brand-emerald"
                              : "border-border bg-background text-foreground/70"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div className="flex-1 pt-1.5">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium tracking-tight">
                              {step.sub}
                            </p>
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                              {step.title}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                            {step.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="border-t border-border px-5 py-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Hash final ancré
                    </span>
                    <span className="font-mono text-foreground">
                      {shortHash(
                        "0x4e6f8a1b3c5d7e9f2a4b6c8d1e3f5a7b9c2d4e6f",
                        12,
                        10,
                      )}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Délai total carte → fournisseur
                    </span>
                    <span className="font-medium text-foreground">
                      2 j 1 h 47 min
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Frais réels
                    </span>
                    <span className="font-medium text-foreground">
                      {formatEUR(1.45)} (2,9 %)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
