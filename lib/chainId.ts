import { z } from "zod";

export const ChainId = {
  SEPOLIA: 11155111,
  BASE_SEPOLIA: 84532,
} as const;
export type ChainId = (typeof ChainId)[keyof typeof ChainId];

export const isChainId = (chainId: number): chainId is ChainId =>
  Object.values(ChainId).includes(chainId as ChainId);

// Schema;
// export const chainIdSchema = z.object({
//   chainId: z.literal(...Object.values(ChainId)),
// });
