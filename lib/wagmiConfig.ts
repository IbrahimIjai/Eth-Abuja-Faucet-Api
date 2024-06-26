import { http, createConfig } from "@wagmi/core";
import { baseSepolia, sepolia } from "@wagmi/core/chains";

export const appconfig = createConfig({
  chains: [baseSepolia, sepolia],
  transports: {
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
  },
});
