import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DonateCard } from "@/components/projects/donate-card";
import {
  getEventsForProject,
  getProject,
  getProjectSlugs,
  getRecentEvents,
} from "@/lib/data/projects";
import { formatEUR, shortHash } from "@/lib/utils";

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
                  <DonateCard
                    projectSlug={project.slug}
                    raised={project.raised}
                    goal={project.goal}
                    donors={project.donors}
                    transparencyScore={project.transparencyScore}
                    contractAddress={project.contractAddress}
                    chain={project.chain}
                    stablecoin={project.stablecoin}
                  />
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
