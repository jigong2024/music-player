import { useLyric } from "@/hooks/queries/melon/useLyric";
import { baseUrl } from "../api/melon/baseUrl";
import { GetServerSidePropsContext } from "next";
import { useMemo } from "react";
import { MelonLyricItem } from "@/types/melon.type";
import styled from "styled-components";
import { useChart } from "@/hooks/queries/melon/useChart";
import { useRouter } from "next/router";
import { House } from "lucide-react";

type SongDetailPageProps = {
  songId: string;
  initialLyricData: MelonLyricItem;
};

export default function SongDetailPage({
  songId,
  initialLyricData,
}: SongDetailPageProps) {
  const router = useRouter();

  // 노래가사 데이터 가져오기
  const id = typeof songId === "string" ? songId : "";

  const {
    data: lyricData,
    isLoading,
    isError,
  } = useLyric(id, { initialData: initialLyricData });

  //  차트 데이터 가져오기
  const { data: chartData } = useChart();

  const songInfo = useMemo(() => {
    if (!chartData) return null;
    return chartData.find((item) => item.songId === id) || null;
  }, [chartData, id]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생...</div>;
  if (!lyricData) return <div>데이터가 없습니다...</div>;

  const lyrics = lyricData.lyric.split(`\n`);

  return (
    <Background>
      <HomeButton onClick={() => router.push("/")}>
        <House color="white" />
      </HomeButton>
      {/* 노래 정보 표시 (있는 경우만) */}
      {songInfo && (
        <SongInfoContainer>
          <SongTitle>{songInfo.name}</SongTitle>
          <ArtistName>아티스트: {songInfo.artists}</ArtistName>
          <ArtistName>랭킹순위: {songInfo.ranking}</ArtistName>
        </SongInfoContainer>
      )}
      <LyricTItle>{`< 노래 가사 >`}</LyricTItle>
      <MusicLyricContainer>
        {lyrics.map((line: string, index: number) => (
          <Lyric key={index}>{line || <br />}</Lyric>
        ))}
      </MusicLyricContainer>
    </Background>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const songId = context.params?.songId as string;

  try {
    // 가사 데이터 가져오기
    const lyricResponse = await baseUrl.get(`/lyric/${songId}`);
    const lyricData = lyricResponse.data;

    console.log("가사", lyricData);

    return {
      props: { songId, initialLyricData: lyricData },
    };
  } catch (error) {
    console.error("노래가사 데이터 불러오는 중 오류:", error);
    return {
      props: { songId, initialLyricData: null },
    };
  }
}

export const Background = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const HomeButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;

  padding: 10px;
  background-color: #3ed9c9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

// 노래정보
const SongInfoContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const SongTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ArtistName = styled.p`
  font-size: 18px;
`;

// 노래가사
export const LyricTItle = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 10px auto;
  padding: 20px 0px;
  font-size: 18px;
  font-weight: bold;
`;

export const MusicLyricContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 80%;
  margin: 0px auto;
`;

export const Lyric = styled.div`
  display: flex;

  width: 100%;
`;
