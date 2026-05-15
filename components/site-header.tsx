import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/projects", label: "Projets" },
  { href: "/how-it-works", label: "Comment ça marche" },
  { href: "/for-associations", label: "Pour les associations" },
  { href: "/ledger", label: "Registre public" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 surface-glass border-b" aria-hidden />
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button asChild variant="emerald" size="sm">
            <Link href="/projects">
              Donner
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
