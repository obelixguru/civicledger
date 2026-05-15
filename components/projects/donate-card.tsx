"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, formatEUR, formatNumber, shortHash } from "@/lib/utils";

type Props = {
  projectSlug: string;
  raised: number;
  goal: number;
  donors: number;
  transparencyScore: number;
  contractAddress: string;
  chain: string;
  stablecoin: string;
};

const presets = [20, 50, 100];

export function DonateCard({
  projectSlug,
  raised,
  goal,
  donors,
  transparencyScore,
  contractAddress,
  chain,
  stablecoin,
}: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<number>(50);
  const [custom, setCustom] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const amount = custom ? Number(custom) : selected;
  const pct = Math.min(100, Math.round((raised / goal) * 100));

  function pick(amt: number) {
    setSelected(amt);
    setCustom("");
    setError(null);
  }

  function submit() {
    setError(null);
    if (!amount || amount <= 0) {
      setError("Choisis un montant.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/donate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectSlug, amountEur: amount }),
        });
        const data = (await res.json()) as
          | { checkoutUrl: string; mode: "stripe" | "demo" }
          | { error: string; detail?: string };
        if (!res.ok || !("checkoutUrl" in data)) {
          const msg =
            "error" in data ? `${data.error}${data.detail ? " — " + data.detail : ""}` : "Erreur inconnue";
          setError(msg);
          return;
        }
        router.push(data.checkoutUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur réseau");
      }
    });
  }

  return (
    <>
      <Card className="overflow-hidden p-0 shadow-[0_30px_80px_-25px_rgba(15,15,14,0.18)]">
        <div className="border-b border-border p-7">
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-5xl tracking-tight">
              {formatEUR(raised, { compact: true })}
            </p>
            <span className="text-sm text-muted-foreground">
              / {formatEUR(goal, { compact: true })}
            </span>
          </div>
          <Progress value={pct} className="mt-4 h-2" />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">{pct}%</span>{" "}
              collectés
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" />
              {formatNumber(donors)} donneurs
            </span>
          </div>
        </div>

        <div className="p-7">
          <div className="grid grid-cols-3 gap-2">
            {presets.map((amt) => (
              <button
                key={amt}
                onClick={() => pick(amt)}
                className={cn(
                  "rounded-xl border bg-background py-3 text-sm font-medium transition-all cursor-pointer",
                  selected === amt && !custom
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/30 hover:bg-secondary",
                )}
              >
                {amt} €
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-dashed border-border bg-background/60 px-3 py-2 focus-within:border-foreground/30">
            <span className="text-xs text-muted-foreground">Autre</span>
            <input
              type="number"
              min={1}
              max={10000}
              step={1}
              value={custom}
              placeholder="—"
              onChange={(e) => {
                setCustom(e.target.value);
                setError(null);
              }}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
            />
            <span className="text-xs text-muted-foreground">€</span>
          </div>

          <Button
            variant="emerald"
            size="xl"
            className="mt-5 w-full"
            onClick={submit}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Préparation…
              </>
            ) : (
              <>
                Donner {amount ? formatEUR(amount) : "—"} par carte
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>

          {error && (
            <p className="mt-3 text-center text-xs text-destructive">{error}</p>
          )}
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Paiement Stripe · Mint {stablecoin} ·
            Décaissement contre justificatif
          </p>
        </div>

        <div className="border-t border-border bg-muted/40 px-7 py-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Score de transparence
            </span>
            <span className="font-mono text-foreground">
              {transparencyScore}/100
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Smart contract</span>
            <span className="font-mono text-foreground">
              {shortHash(contractAddress, 8, 6)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Réseau</span>
            <span className="font-mono text-foreground">{chain}</span>
          </div>
        </div>
      </Card>

      <div className="mt-4 rounded-2xl border border-dashed border-border bg-card/60 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Garantie remboursement
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Si l'association ne livre pas dans les 90 j, le smart contract te
          rembourse automatiquement sur ta carte.
        </p>
      </div>
    </>
  );
}
