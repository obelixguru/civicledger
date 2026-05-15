"use client";

import { useState, useTransition } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  legalForm: string;
  registrationNumber: string;
  country: string;
  city: string;
  foundedYear: string;
  contactName: string;
  email: string;
  website: string;
  description: string;
  estimatedAnnualBudgetEur: string;
};

const initial: FormState = {
  name: "",
  legalForm: "Loi 1901",
  registrationNumber: "",
  country: "France",
  city: "",
  foundedYear: "",
  contactName: "",
  email: "",
  website: "",
  description: "",
  estimatedAnnualBudgetEur: "",
};

export function ApplicationForm() {
  const [state, setState] = useState<FormState>(initial);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (state.description.trim().length < 80) {
      setError(
        "La description doit faire au moins 80 caractères — décris vraiment ta cause.",
      );
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: state.name,
            legalForm: state.legalForm,
            registrationNumber: state.registrationNumber || undefined,
            country: state.country,
            city: state.city,
            foundedYear: Number(state.foundedYear),
            contactName: state.contactName,
            email: state.email,
            website: state.website || undefined,
            description: state.description,
            estimatedAnnualBudgetEur: state.estimatedAnnualBudgetEur
              ? Number(state.estimatedAnnualBudgetEur)
              : undefined,
          }),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) {
          setError(data.error ?? "Une erreur est survenue");
          return;
        }
        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur réseau");
      }
    });
  }

  if (success) {
    return (
      <Card className="overflow-hidden p-0">
        <div className="px-10 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald-soft text-brand-emerald">
            <CheckCircle2 className="size-7" />
          </div>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Dossier reçu
          </p>
          <h3 className="mt-3 text-balance font-sans text-3xl font-medium leading-tight tracking-[-0.02em]">
            Merci, on revient vers toi{" "}
            <span className="font-serif italic font-normal text-brand-emerald">
              sous 7 jours
            </span>
            .
          </h3>
          <p className="mx-auto mt-5 max-w-md text-pretty text-sm text-muted-foreground">
            Une copie de ta candidature t'a été envoyée à{" "}
            <span className="font-medium text-foreground">{state.email}</span>.
            Ton·ta référent·e CivicLedger te recontactera pour la suite (statuts,
            bilan, pièce d'identité du mandataire).
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <form onSubmit={submit} className="space-y-7 p-8 sm:p-10">
        <Section label="L'association">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom officiel" required>
              <input
                type="text"
                required
                value={state.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Maison d'Espoir"
                className="form-input"
              />
            </Field>
            <Field label="Forme juridique" required>
              <select
                required
                value={state.legalForm}
                onChange={(e) => update("legalForm", e.target.value)}
                className="form-input"
              >
                <option>Loi 1901</option>
                <option>ASBL (Belgique)</option>
                <option>Verein (Allemagne)</option>
                <option>Onlus (Italie)</option>
                <option>Charity (UK)</option>
                <option>Autre</option>
              </select>
            </Field>
            <Field
              label="Numéro RNA ou équivalent"
              hint="Optionnel mais accélère l'instruction"
            >
              <input
                type="text"
                value={state.registrationNumber}
                onChange={(e) =>
                  update("registrationNumber", e.target.value)
                }
                placeholder="W123456789"
                className="form-input"
              />
            </Field>
            <Field label="Année de création" required>
              <input
                type="number"
                required
                min={1900}
                max={2100}
                value={state.foundedYear}
                onChange={(e) => update("foundedYear", e.target.value)}
                placeholder="2014"
                className="form-input"
              />
            </Field>
            <Field label="Pays" required>
              <input
                type="text"
                required
                value={state.country}
                onChange={(e) => update("country", e.target.value)}
                className="form-input"
              />
            </Field>
            <Field label="Ville" required>
              <input
                type="text"
                required
                value={state.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Valence"
                className="form-input"
              />
            </Field>
          </div>
        </Section>

        <Section label="La personne référente">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom du·de la référent·e" required>
              <input
                type="text"
                required
                value={state.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                placeholder="Camille Dupont"
                className="form-input"
              />
            </Field>
            <Field label="Email de contact" required>
              <input
                type="email"
                required
                value={state.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="contact@maison-espoir.org"
                className="form-input"
              />
            </Field>
            <Field label="Site web" hint="Optionnel">
              <input
                type="url"
                value={state.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://"
                className="form-input"
              />
            </Field>
            <Field label="Budget annuel estimé (€)" hint="Optionnel">
              <input
                type="number"
                min={0}
                value={state.estimatedAnnualBudgetEur}
                onChange={(e) =>
                  update("estimatedAnnualBudgetEur", e.target.value)
                }
                placeholder="50000"
                className="form-input"
              />
            </Field>
          </div>
        </Section>

        <Section label="Ta cause">
          <Field
            label="Décris l'asso et ce que vous faites concrètement"
            required
            hint={`${state.description.length}/80 caractères minimum`}
          >
            <textarea
              required
              rows={6}
              value={state.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="On accompagne 50 enfants placés sur Valence depuis 2014. On fournit fournitures scolaires, accompagnement aux devoirs, sorties culturelles. Nos comptes 2024 montrent 78 % de dépenses terrain."
              className="form-input min-h-[160px] resize-y leading-relaxed"
            />
          </Field>
        </Section>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse items-stretch gap-4 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            En soumettant, tu confirmes pouvoir représenter légalement
            l'association.
          </p>
          <Button
            type="submit"
            variant="emerald"
            size="xl"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Envoi…
              </>
            ) : (
              <>
                Déposer la candidature
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className={cn(
          "text-xs font-medium",
          required ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
        {required ? <span className="text-brand-emerald"> *</span> : null}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && (
        <span className="mt-1 block text-[11px] text-muted-foreground">
          {hint}
        </span>
      )}
    </label>
  );
}
