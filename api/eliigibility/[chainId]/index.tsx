import type { VercelRequest, VercelResponse } from "@vercel/node";

import { getUserEligibility } from "../../../lib/helpers/userEligibility";
import type { ChainId } from "../../../lib/chainId";
const handler = async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader(
    "Cache-Control",
    "s-maxage=900, stale-while-revalidate=86400",
  );

  const address = "0xB2ad807Ec5Ac97C617734956760dEd85bEd345C1";
  const chainId = 84532 as ChainId;
  //   const chainId =   request.query
  const tokens = await getUserEligibility(address, chainId);
  return response.status(200).json(tokens);
};

export default handler;
