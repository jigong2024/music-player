export type ChartType = "live" | "day" | "week" | "month";

export interface MelonChartItem {
  albumId: string;
  artists: string;
  name: string;
  ranking: string;
  songId: string;
}

export type MelonChartList = MelonChartItem[];

export interface MelonLyricItem {
  lyric: string;
}
