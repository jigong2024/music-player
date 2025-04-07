// import { useLyric } from "@/hooks/queries/melon/useLyric";
// import { useRouter } from "next/router";
// import React, { useEffect } from "react";

// const songDetailPage = () => {
//   const router = useRouter();
//   const { songId } = router.query;

//   const { data: lyricData, isLoading, isError } = useLyric(songId);

//   useEffect(() => {
//     console.log("데이터:", lyricData);
//   }, [lyricData]);

//   if (isLoading) return <div>로딩 중...</div>;
//   if (isError) return <div>오류 발생...</div>;
//   if (!lyricData) return <div>데이터가 없습니다...</div>;

//   return <div></div>;
// };

// export default songDetailPage;
