import { writeContract } from "@wagmi/core";
import abi from "../contracts/faucetAbi.json";
import { appconfig } from "../wagmiConfig";
import { ChainId } from "../chainId";
import {
  baseSepoliaFaucet,
  sepoliaFaucet,
} from "../contracts/faucetContractAddress";

export async function dripFaucet(address: string, chainId: ChainId) {
  const result = await writeContract(appconfig, {
    abi,
    address:
      chainId == ChainId.BASE_SEPOLIA ? baseSepoliaFaucet : sepoliaFaucet,
    functionName: "dripTokens",
    args: [address],
  });

  return result;
}
