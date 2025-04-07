import { fetchChart } from "@/services/melonApi";
import { ChartType, MelonChartList } from "@/types/melon.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// melon chart를 가져오는 custom hook
export const useChart = (chartType: ChartType) => {
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
