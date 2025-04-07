import { fetchChart } from "@/services/melonApi";
import { chartTypeAtom } from "@/store/atom";
import { MelonChartList } from "@/types/melon.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

// melon chart를 가져오는 custom hook
export const useChart = () => {
  const chartType = useAtomValue(chartTypeAtom);

  return useQuery<MelonChartList>({
    queryKey: ["melonChart", chartType],
    queryFn: async () => {
      const data = await fetchChart(chartType);
      return data as MelonChartList;
    },

    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
