import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Stripe not configured: set STRIPE_SECRET_KEY in .env.local",
    );
  }
  _stripe = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
    appInfo: { name: "CivicLedger", version: "0.1.0" },
  });
  return _stripe;
}

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
