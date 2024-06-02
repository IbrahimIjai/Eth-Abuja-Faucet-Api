import type { VercelRequest, VercelResponse } from "@vercel/node";
import { dripFaucet } from "../lib/helpers/dripFaucet";
import type { ChainId } from "../lib/chainId";

const handler = async (_request: VercelRequest, response: VercelResponse) => {
  response.setHeader(
    "Cache-Control",
    "s-maxage=60, stale-while-revalidate=600",
  );
  const address = "0xB2ad807Ec5Ac97C617734956760dEd85bEd345C1";
  const chainId = 84532 as ChainId;
  const dripTokenResponse = await dripFaucet(address, chainId);
  console.log("drippong  tokens response", dripTokenResponse);
  return response.status(200).json(dripTokenResponse);
};

export default handler;
