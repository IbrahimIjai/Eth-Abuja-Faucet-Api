import { readContract } from "@wagmi/core";
import abi from "../contracts/faucetAbi.json" assert { type: "json" };
import { appconfig } from "../wagmiConfig";
import { ChainId } from "../chainId";
import {
  baseSepoliaFaucet,
  sepoliaFaucet,
} from "../contracts/faucetContractAddress";

const getUserEligibility = async (address: string, chainId: ChainId) => {
  const result = await readContract(appconfig, {
    abi,
    address:
      chainId == ChainId.BASE_SEPOLIA ? baseSepoliaFaucet : sepoliaFaucet,
    functionName: "isTesterEligible",
    args: [address],
  });

  return result;
};

export default getUserEligibility;

// Sepolia
// Sepolia = 0xD7b8000D068795425Ce7EbA479D47D2A4850FfC9

// https://sepolia.etherscan.io/address/0xD7b8000D068795425Ce7EbA479D47D2A4850FfC9#code

// base

// 0x308147a57Fc93824c160e7B20F5d7ffAdC1C6F4a
// https://sepolia.basescan.org/address/0x308147a57Fc93824c160e7B20F5d7ffAdC1C6F4a
