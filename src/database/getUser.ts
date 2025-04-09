import { query } from "./connection";

interface User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

const getAllUsers = async (): Promise<User[]> => {
  const selectQuery = "SELECT * FROM users ORDER BY created_at DESC";

  try {
    const users = await query<User>(selectQuery);
    console.log("전체 사용자 목록:", users);
    return users;
  } catch (error) {
    console.error("사용자 조회 오류:", error);
    return [];
  }
};

const getUserById = async (id: number): Promise<User | null> => {
  const selectQuery = "SELECT * FROM users WHERE id = $1";

  try {
    const users = await query<User>(selectQuery, [id]);
    if (users.length === 0) {
      console.log(`ID ${id}에 해당하는 사용자를 찾을 수 없습니다.}`);
      return null;
    }

    console.log("조회된 사용자:", users[0]);
    return users[0];
  } catch (error) {
    console.error("사용자 조회 오류:", error);
    return null;
  }
};

// 실행
(async () => {
  await getAllUsers();
  await getUserById(1);
})();
