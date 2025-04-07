"use client";

import { useChart } from "@/hooks/queries/melon/useChart";
import { chartTypeAtom } from "@/store/atom";
import { ChartType } from "@/types/melon.type";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

type FilterBtnListType = {
  type: ChartType;
  name: string;
};

const filterBtnList: FilterBtnListType[] = [
  {
    type: "day",
    name: "일간",
  },
  {
    type: "week",
    name: "주간",
  },
  {
    type: "month",
    name: "월간",
  },
  {
    type: "live",
    name: "실시간",
  },
];

const MusicList = () => {
  const [chartType, setChartType] = useAtom(chartTypeAtom);
  const { data: chartList, isLoading, isError } = useChart();

  const router = useRouter();

  useEffect(() => {
    console.log("데이터:", chartList);
  }, [chartType, chartList]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생...</div>;
  if (!chartList) return <div>데이터가 없습니다...</div>;

  return (
    <MusicListContainer>
      <FilterBtnContainer>
        {filterBtnList.map(({ type, name }) => (
          <FilterBtn
            key={type}
            active={chartType === type}
            onClick={() => setChartType(type)}
          >
            {name}
          </FilterBtn>
        ))}
      </FilterBtnContainer>
      {chartList.map((item, index) => {
        return (
          <MusicOneContainer key={index}>
            <RankSection>{index + 1}</RankSection>
            <MusicSection onClick={() => router.push(`/song/${item.songId}`)}>
              {`🎵: ${item.name} 🎤: ${item.artists}`}
            </MusicSection>
          </MusicOneContainer>
        );
      })}
    </MusicListContainer>
  );
};

export default MusicList;

export const MusicListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 80%;
  margin: 0px auto;
`;

export const FilterBtnContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

type ButtonType = {
  active: boolean;
};

export const FilterBtn = styled.button<ButtonType>`
  display: flex;
  background-color: ${(props) => (props.active ? "#3ed9c9" : "white")};
  border: ${(props) =>
    props.active ? "2px solid #3ed9c9" : " 2px solid #83a0ab"};

  border-radius: 8px;
  padding: 10px 15px;
  color: ${(props) => (props.active ? "white" : "#83a0ab")};
  font-weight: bold;
`;

export const MusicOneContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const RankSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #3ed9c9;
  border-radius: 8px;
  width: 8%;
`;

export const MusicSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid #3ed9c9;
  border-radius: 8px;
  padding: 15px;
`;
