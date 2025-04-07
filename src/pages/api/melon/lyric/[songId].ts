import { NextApiRequest, NextApiResponse } from "next";
import { baseUrl } from "../baseUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { songId } = req.query;

  try {
    const response = await baseUrl.get(`/lyric/${songId}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch lyrics from Melon API" });
  }
}
