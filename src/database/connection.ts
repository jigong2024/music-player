import { Pool, PoolClient } from "pg";

// 환경변수에서 DATABASE_URL 가져오기
const connectionString = process.env.DATABASE_URL;

// 연결 폴 생성
const pool = new Pool({ connectionString });

// 연결 테스트 함수
export const testConnection = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL 데이터베이스에 성공적으로 연결되었습니다.");
    client.release();
  } catch (error) {
    console.error("데이터베이스 연결 오류:", error);
  }
};
// 쿼리 실행 함수
export const query = async <T>(
  text: string,
  params?: unknown[]
): Promise<T[]> => {
  try {
    const result = await pool.query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error("쿼리 실행 오류:", error);
    throw error; // 오류를 던지지 않으면 undefined가 반환될 수 있음
  }
};

// 트랜잭션 실행 함수
export const transaction = async <T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// 데이터베이스 연결 풀 내보내기
export default pool;
