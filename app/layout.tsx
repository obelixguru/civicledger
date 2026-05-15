import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://civicledger.app"),
  title: {
    default: "CivicLedger — La philanthropie, prouvée au centime près.",
    template: "%s · CivicLedger",
  },
  description:
    "Plateforme de dons certifiés par la blockchain. Paiement par carte, traçabilité on-chain, audit IA des projets associatifs. Chaque euro est vérifiable.",
  keywords: [
    "dons",
    "blockchain",
    "associations",
    "philanthropie",
    "transparence",
    "stablecoin",
    "USDC",
    "smart contract",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "CivicLedger — La philanthropie, prouvée.",
    description:
      "Donne par carte, suis ton don on-chain. Chaque euro vérifiable, du clic au terrain.",
    siteName: "CivicLedger",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
