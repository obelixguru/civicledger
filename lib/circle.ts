// Circle Programmable Wallets integration — placeholder.
//
// Real implementation will use Circle's Developer-Controlled Wallets API:
//   1. Fund a treasury wallet with the EUR equivalent (via Circle Mint payouts)
//   2. Transfer EURC (Polygon) or USDC (Base) to the project's smart contract
//      address using `POST /v1/w3s/developer/transactions/transfer`
//   3. Persist the on-chain tx hash and emit a `lock` ledger_event
//
// For now this returns a deterministic-looking fake hash so the donation flow
// is end-to-end testable without API access. Set CIRCLE_API_KEY in .env.local
// once you're ready to wire the real call.

export type MintArgs = {
  amountEur: number;
  stablecoin: "EURC" | "USDC";
  chain: "Polygon" | "Base" | "Solana";
  recipientContract: string;
  reference: string;
};

export type MintResult = {
  txHash: string;
  status: "submitted" | "confirmed" | "mocked";
  provider: "circle" | "mock";
};

export function isCircleConfigured() {
  return Boolean(process.env.CIRCLE_API_KEY);
}

export async function mintForDonation(args: MintArgs): Promise<MintResult> {
  if (!isCircleConfigured()) {
    return {
      txHash: mockHash(args.reference),
      status: "mocked",
      provider: "mock",
    };
  }

  // TODO: real Circle API call
  // const res = await fetch("https://api.circle.com/v1/w3s/developer/transactions/transfer", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     idempotencyKey: args.reference,
  //     amounts: [String(args.amountEur)],
  //     tokenId: args.stablecoin === "EURC" ? CIRCLE_EURC_TOKEN_ID : CIRCLE_USDC_TOKEN_ID,
  //     destinationAddress: args.recipientContract,
  //     walletId: process.env.CIRCLE_TREASURY_WALLET_ID,
  //   }),
  // });
  // const data = await res.json();
  // return { txHash: data.txHash, status: "submitted", provider: "circle" };

  throw new Error("Circle integration not yet implemented");
}

function mockHash(reference: string): string {
  // Deterministic-looking hex from the reference string
  let h = 0;
  for (let i = 0; i < reference.length; i++) {
    h = (h * 31 + reference.charCodeAt(i)) >>> 0;
  }
  const hex = h.toString(16).padStart(8, "0");
  // pad to a believable 40-char EVM-style hash
  return "0x" + hex.repeat(5).slice(0, 40);
}
