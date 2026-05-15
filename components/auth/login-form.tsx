"use client";

import { useState, useTransition } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError("Entre ton email.");
      return;
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/magic-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) {
          setError(data.error ?? "Erreur inconnue");
          return;
        }
        setSent(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur réseau");
      }
    });
  }

  if (sent) {
    return (
      <div className="px-8 py-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-emerald-soft text-brand-emerald">
          <CheckCircle2 className="size-6" />
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Lien envoyé
        </p>
        <h2 className="mt-3 text-balance font-sans text-2xl font-medium leading-tight tracking-tight">
          Regarde tes mails.
        </h2>
        <p className="mx-auto mt-3 max-w-xs text-pretty text-sm text-muted-foreground">
          On t'a envoyé un lien magique à{" "}
          <span className="font-medium text-foreground">{email}</span>. Il expire
          dans une heure.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 p-8">
      <label className="block">
        <span className="text-xs font-medium text-foreground">
          Email
          <span className="text-brand-emerald"> *</span>
        </span>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-foreground/30">
          <Mail className="size-4 text-muted-foreground" />
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="toi@exemple.fr"
            className="w-full bg-transparent py-3 text-sm font-medium outline-none placeholder:text-muted-foreground"
          />
        </div>
      </label>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="emerald"
        size="xl"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Envoi…
          </>
        ) : (
          <>
            Envoyer le lien magique
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
