import { fetchLyric } from "@/services/melonApi";
import { MelonLyricItem } from "@/types/melon.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// melon lyric 데이터를 가져오는 custom hook
export const useLyric = (songId: string, option = {}) => {
  return useQuery<MelonLyricItem>({
    queryKey: ["melonLyric", songId],
    queryFn: async () => {
      const data = await fetchLyric(songId);
      return data;
    },
    staleTime: 1000 * 60 * 60 * 34,
    enabled: !!songId,
    placeholderData: keepPreviousData,
    ...option,
  });
};
