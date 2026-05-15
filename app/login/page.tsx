import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Se connecter",
  description:
    "Connecte-toi à CivicLedger pour suivre tes dons et tes reçus fiscaux.",
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative bg-paper">
        <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-md px-6 py-24">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Suivi de tes dons
          </p>
          <h1 className="mt-4 text-balance text-center font-sans text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl">
            Reprends la{" "}
            <span className="font-serif italic font-normal text-brand-emerald">
              main
            </span>
            .
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-pretty text-center text-sm text-muted-foreground">
            Pas de mot de passe. On t'envoie un lien magique par email — tu
            cliques, tu es dedans.
          </p>

          <Card className="mt-10 overflow-hidden p-0">
            <LoginForm />
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Pas encore de compte ? Il se crée automatiquement à ton premier don.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
