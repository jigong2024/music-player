import { query } from "./connection";

interface User {
  username: string;
  email: string;
}

const addUser = async (
  username: string,
  email: string
): Promise<User | null> => {
  const insertQuery = `
    INSERT INTO user (username, email)
    VALUES ($1, $2)
    RETURNING id, username, email, created_at
    `;

  try {
    const result = await query<User>(insertQuery, [username, email]);
    console.log("사용자가 성공적으로 추가되었습니다:", result[0]);
    return result[0];
  } catch (error) {
    console.error("사용자 추가 오류:", error);
    return null;
  }
};

// 실행
(async () => {
  await addUser("홍길동", "hong@example.com");
  await addUser("김철수", "kim@example.com");
})();
