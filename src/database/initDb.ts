import { query, testConnection } from "./connection";

// user 테이블 생성
const createUsersTable = async () => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

  const createPostsTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id)
    created_id TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  try {
    await query(createUserTableQuery);
    await query(createPostsTableQuery);
    console.log("테이블이 성공적으로 생성되었습니다.");
  } catch (error) {
    console.error("테이블 생성 오류:", error);
  }
};

// 실행
(async () => {
  await testConnection();
  await createUsersTable();
})();
