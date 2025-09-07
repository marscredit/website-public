export const site = {
  name: "Mars Credit",
  url: "https://marscredit.org",
  twitter: "marscredit",
  description: "Mineable, EVM-compatible Layer‑1 tuned for the Red Planet.",
} as const

export const network = {
  chainId: Number(process.env.MARS_CHAIN_ID ?? 12345),
  name: process.env.MARS_CHAIN_NAME ?? "Mars Credit",
  symbol: process.env.MARS_SYMBOL ?? "MARS",
  decimals: Number(process.env.MARS_DECIMALS ?? 18),
  rpc: [
    process.env.MARS_RPC_PRIMARY!,
    process.env.MARS_RPC_FALLBACK!,
  ].filter(Boolean),
  explorer: process.env.MARS_EXPLORER_URL ?? "https://explorer.marscredit.org",
} as const

export const links = {
  github: "https://github.com/marscredit",
  docs: "https://docs.marscredit.org",
  discord: "https://discord.gg/marscredit",
  twitter: "https://twitter.com/marscredit",
  blockscan: "https://explorer.marscredit.org",
  bridge: "https://bridge.marscredit.org",
  grants: "https://grants.marscredit.org",
  mining: "https://github.com/marscredit/mining-app",
  trade: "https://www.geckoterminal.com/solana/pools/mars-credit",
} as const

