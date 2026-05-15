export const platformStats = {
  associationsVerified: 47,
  totalDistributed: 1_240_000,
  averageTraceability: 97,
  donorsCount: 18_420,
  projectsActive: 23,
  averageReleaseTime: "4,2 j",
};

export const trustLogos = [
  { name: "Stripe", role: "Paiement carte" },
  { name: "Circle", role: "Mint USDC / EURC" },
  { name: "Polygon", role: "Smart contract" },
  { name: "Base", role: "Smart contract" },
  { name: "RGPD", role: "Données" },
  { name: "Mazars", role: "Audit annuel" },
  { name: "Stripe", role: "Paiement carte" },
  { name: "Circle", role: "Mint USDC / EURC" },
];

export const faqItems = [
  {
    q: "Pourquoi vous utilisez la blockchain si je paye par carte ?",
    a: "La carte sert à toi : c'est rassurant, instantané, et tu connais. La blockchain sert à la preuve : chaque euro reçu est converti en stablecoin (1 EURC = 1 €) et bloqué dans un contrat dédié à ton projet. Personne ne peut retirer sans justificatif validé.",
  },
  {
    q: "Quelle association peut s'inscrire ?",
    a: "Uniquement des associations déjà existantes (loi 1901 ou équivalent international), avec au moins 12 mois d'activité et un compte bancaire vérifié. On vérifie les statuts, le rapport moral, et on attribue un score de fiabilité initial avant publication du moindre projet.",
  },
  {
    q: "Que se passe-t-il si l'association ne livre pas ?",
    a: "Les fonds restent bloqués dans le smart contract. Si aucune preuve n'est soumise dans les 90 jours suivant la fin de campagne, le contrat déclenche un remboursement automatique aux donneurs (en euros, sur leur moyen de paiement initial).",
  },
  {
    q: "Comment est calculé le score de transparence ?",
    a: "L'IA évalue 5 dimensions : cohérence budgétaire, qualité des justificatifs, délai moyen de décaissement, ratio frais/terrain, et historique de l'association. Recalculé après chaque décaissement.",
  },
  {
    q: "Combien CivicLedger prélève sur mon don ?",
    a: "2,9 % couvrent les frais de paiement (Stripe), de mint (Circle) et de smart contract. CivicLedger ne prend aucune commission supplémentaire — l'infrastructure est financée par une fondation séparée.",
  },
];
