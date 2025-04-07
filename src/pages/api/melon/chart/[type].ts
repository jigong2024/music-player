import { NextApiRequest, NextApiResponse } from "next";
import { baseUrl } from "../baseUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;

  try {
    const response = await baseUrl.get(`/chart/${type}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch data from Melon API" });
  }
}
