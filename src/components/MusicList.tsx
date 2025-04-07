"use client";

import { useChart } from "@/hooks/queries/melon/useChart";
import { chartTypeAtom } from "@/store/atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import styled from "styled-components";

const MusicList = () => {
  const [chartType, setChartType] = useAtom(chartTypeAtom);
  const { data: chartList, isLoading, isError } = useChart(chartType);

  useEffect(() => {
    console.log("데이터:", chartList);
  }, [chartType, chartList]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생...</div>;
  if (!chartList) return <div>데이터가 없습니다...</div>;

  return (
    <MusicListContainer>
      <FilterBtnContainer>
        <FilterBtn
          active={chartType === "day"}
          onClick={() => setChartType("day")}
        >
          일간
        </FilterBtn>
        <FilterBtn
          active={chartType === "week"}
          onClick={() => setChartType("week")}
        >
          주간
        </FilterBtn>
        <FilterBtn
          active={chartType === "month"}
          onClick={() => setChartType("month")}
        >
          월간
        </FilterBtn>
        <FilterBtn
          active={chartType === "live"}
          onClick={() => setChartType("live")}
        >
          실시간
        </FilterBtn>
      </FilterBtnContainer>
      {chartList.map((item, index) => {
        return (
          <MusicOneContainer key={index}>
            <RankSection>{index + 1}</RankSection>
            <MusicSection>
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
