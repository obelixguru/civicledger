import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  getEventsForProject,
  getProject,
  getProjectSlugs,
  getRecentEvents,
} from "@/lib/data/projects";
import { formatEUR, formatNumber, shortHash } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, events] = await Promise.all([
    getProject(slug),
    getEventsForProject(slug, 10),
  ]);
  if (!project) notFound();

  const projectEvents =
    events.length > 0 ? events : await getRecentEvents(3);
  const pct = Math.min(100, Math.round((project.raised / project.goal) * 100));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative bg-paper">
          <div className="mx-auto max-w-7xl px-6 pt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Tous les projets
            </Link>
          </div>

          <div className="mx-auto max-w-7xl px-6 pt-8 pb-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{project.category}</Badge>
                  {project.association.verified && (
                    <Badge variant="emerald">
                      <ShieldCheck className="size-3" />
                      Association vérifiée
                    </Badge>
                  )}
                  <Badge variant="outline">
                    <span className="font-mono text-[10px] tracking-[0.14em]">
                      {project.chain} · {project.stablecoin}
                    </span>
                  </Badge>
                </div>

                <h1 className="mt-5 text-balance font-sans text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
                  {project.tagline}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="font-medium text-foreground">
                      {project.association.name}
                    </span>
                    · depuis {project.association.sinceYear}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {project.association.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    Reste {project.daysLeft} j
                  </span>
                </div>

                <div className="mt-10 overflow-hidden rounded-2xl border border-border">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Le besoin
                    </h2>
                    <p className="mt-3 text-pretty text-base leading-relaxed text-foreground">
                      Un projet concret, budgété ligne par ligne, validé par
                      l'IA d'audit avant publication. Chaque dépense fera
                      l'objet d'un justificatif et d'un décaissement traçable.
                    </p>
                  </div>
                  <div>
                    <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Le mécanisme
                    </h2>
                    <p className="mt-3 text-pretty text-base leading-relaxed text-foreground">
                      Tes dons sont convertis en {project.stablecoin} et
                      verrouillés dans un smart contract. Aucun transfert sans
                      facture validée et photo de livraison datée.
                    </p>
                  </div>
                </div>

                <Separator className="my-12" />

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Activité on-chain
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tous les événements liés à ce projet, en clair.
                  </p>

                  <ul className="mt-8 space-y-3">
                    {projectEvents.map((e) => (
                      <li
                        key={e.id}
                        className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/15"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-brand-emerald" />
                            <p className="text-sm font-medium capitalize">
                              {e.type.replace("_", " ")}
                              {e.amount ? (
                                <span className="ml-2 font-serif text-base">
                                  {formatEUR(e.amount)}
                                </span>
                              ) : null}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {e.detail}
                          </p>
                          <p className="mt-1.5 truncate font-mono text-[11px] text-muted-foreground/70">
                            {shortHash(e.txHash, 12, 10)} · {e.actor}
                          </p>
                        </div>
                        <a
                          href="#"
                          className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Voir <ExternalLink className="size-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                  <Card className="overflow-hidden p-0 shadow-[0_30px_80px_-25px_rgba(15,15,14,0.18)]">
                    <div className="border-b border-border p-7">
                      <div className="flex items-baseline justify-between">
                        <p className="font-serif text-5xl tracking-tight">
                          {formatEUR(project.raised, { compact: true })}
                        </p>
                        <span className="text-sm text-muted-foreground">
                          / {formatEUR(project.goal, { compact: true })}
                        </span>
                      </div>
                      <Progress value={pct} className="mt-4 h-2" />
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          <span className="font-medium text-foreground">
                            {pct}%
                          </span>{" "}
                          collectés
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="size-3.5" />
                          {formatNumber(project.donors)} donneurs
                        </span>
                      </div>
                    </div>

                    <div className="p-7">
                      <div className="grid grid-cols-3 gap-2">
                        {[20, 50, 100].map((amt) => (
                          <button
                            key={amt}
                            className="rounded-xl border border-border bg-background py-3 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-secondary cursor-pointer"
                          >
                            {amt} €
                          </button>
                        ))}
                      </div>
                      <button className="mt-2 w-full rounded-xl border border-dashed border-border bg-background/60 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground cursor-pointer">
                        Autre montant
                      </button>

                      <Button variant="emerald" size="xl" className="mt-5 w-full">
                        Donner par carte
                        <ArrowRight className="size-4" />
                      </Button>
                      <p className="mt-3 text-center text-[11px] text-muted-foreground">
                        Paiement Stripe · Mint {project.stablecoin} ·
                        Décaissement contre justificatif
                      </p>
                    </div>

                    <div className="border-t border-border bg-muted/40 px-7 py-5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Score de transparence
                        </span>
                        <span className="font-mono text-foreground">
                          {project.transparencyScore}/100
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Smart contract
                        </span>
                        <span className="font-mono text-foreground">
                          {shortHash(project.contractAddress, 8, 6)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Réseau</span>
                        <span className="font-mono text-foreground">
                          {project.chain}
                        </span>
                      </div>
                    </div>
                  </Card>

                  <div className="mt-4 rounded-2xl border border-dashed border-border bg-card/60 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Garantie remboursement
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Si l'association ne livre pas dans les 90 j, le smart
                      contract te rembourse automatiquement sur ta carte.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
