import { ChartType } from "@/types/melon.type";
import axios from "axios";

// melon chart GET
export const fetchChart = async (chartType: ChartType) => {
  const response = await axios.get(`/api/melon/chart/${chartType}`);

  const chartArray = Object.values(response.data);

  return chartArray;
};

// melon lyric GET
export const fetchLyric = async (songId: string) => {
  const response = await axios.get(`/api/melon/lyric/${songId}`);

  const lyricArray = response.data;

  return lyricArray;
};
