import { useLyric } from "@/hooks/queries/melon/useLyric";
import { baseUrl } from "../api/melon/baseUrl";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { MelonLyricItem } from "@/types/melon.type";
import styled from "styled-components";

type SongDetailPageProps = {
  songId: string;
  initialLyricData: MelonLyricItem;
};

export default function SongDetailPage({
  songId,
  initialLyricData,
}: SongDetailPageProps) {
  const id = typeof songId === "string" ? songId : "";

  const {
    data: lyricData,
    isLoading,
    isError,
  } = useLyric(id, { initialData: initialLyricData });

  useEffect(() => {
    console.log("가사=>", lyricData);
  }, [lyricData]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생...</div>;
  if (!lyricData) return <div>데이터가 없습니다...</div>;

  const lyrics = lyricData.lyric.split(`\n`);

  return (
    <Background>
      <HeaderContainer>노래 가사</HeaderContainer>
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
    const response = await baseUrl.get(`/lyric/${songId}`);
    const lyricData = response.data;

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
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 10px auto;
  padding: 20px 0px;
  font-size: x-large;
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
