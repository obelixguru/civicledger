import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Don confirmé",
  description: "Ton don a été reçu et verrouillé sur le smart contract.",
};

export default async function DonationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ donation_id?: string; demo?: string }>;
}) {
  const { donation_id, demo } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="relative bg-paper">
        <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-6 py-28">
          <Card className="overflow-hidden p-0 shadow-[0_30px_80px_-25px_rgba(15,15,14,0.18)]">
            <div className="border-b border-border px-10 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald-soft text-brand-emerald">
                <CheckCircle2 className="size-7" />
              </div>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Don confirmé
              </p>
              <h1 className="mt-3 text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
                Ton don est{" "}
                <span className="font-serif italic font-normal text-brand-emerald">
                  verrouillé on-chain
                </span>
                .
              </h1>
              <p className="mx-auto mt-5 max-w-md text-pretty text-base text-muted-foreground">
                Il sera libéré dès que l'association soumettra son justificatif
                et que l'IA d'audit l'aura validé. Tu seras notifié·e à chaque
                étape.
              </p>
              {demo === "1" && (
                <Badge variant="amber" className="mt-6">
                  Mode démo · Stripe non configuré
                </Badge>
              )}
            </div>

            <div className="space-y-4 px-10 py-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Référence</span>
                <span className="font-mono text-foreground">
                  {donation_id ?? "—"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reçu fiscal</span>
                <span className="text-foreground">
                  envoyé par mail sous 24 h
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Garantie</span>
                <span className="text-foreground">
                  remboursement si non livré à 90 j
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border bg-muted/30 px-10 py-7 sm:flex-row sm:items-center sm:justify-between">
              <Button asChild variant="ghost" size="sm">
                <Link href="/ledger">
                  Voir l'événement on-chain
                  <ExternalLink className="size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="emerald" size="lg">
                <Link href="/projects">
                  Découvrir d'autres projets
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
