import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { StatsBand } from "@/components/landing/stats-band";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturedProjects } from "@/components/landing/featured-projects";
import { TransparencyVisual } from "@/components/landing/transparency-visual";
import { AssociationsCTA } from "@/components/landing/associations-cta";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { getProjects, getRecentEvents } from "@/lib/data/projects";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, events] = await Promise.all([
    getProjects(),
    getRecentEvents(5),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero events={events} />
        <TrustStrip />
        <FeaturedProjects projects={projects} />
        <HowItWorks />
        <TransparencyVisual />
        <StatsBand />
        <AssociationsCTA />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
