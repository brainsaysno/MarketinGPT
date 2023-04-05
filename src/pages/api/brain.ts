// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { searchPhotos } from "@/api/brain";
import type { NextApiRequest, NextApiResponse } from "next";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Photos>
) {
  res.status(200).json(await searchPhotos(req.query.q as string));
}
