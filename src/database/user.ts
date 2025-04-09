import { query, testConnection } from "./connection";

// user 테이블 생성
const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

  try {
    await query(createTableQuery);
    console.log("사용자 테이블이 성공적으로 생성되었습니다.");
  } catch (error) {
    console.error("테이블 생성 오류:", error);
  }
};

// 실행
(async () => {
  await testConnection();
  await createUsersTable();
})();
