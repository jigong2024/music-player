import { transaction } from "./connection";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
}

const createUserWithPost = async (
  username: string,
  email: string,
  posts: { title: string; content: string }[]
): Promise<{ user: User; posts: Post[] }> => {
  return transaction(async (client) => {
    // 사용자 추가
    const userResult = await client.query<User>(
      "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id, username, email",
      [username, email]
    );

    const user = userResult.rows[0];

    // 사용자의 게시물 추가
    const createdPosts: Post[] = [];
    for (const post of posts) {
      const postResult = await client.query<Post>(
        "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content, user_id",
        [post.title, post.content, user.id]
      );

      createdPosts.push(postResult.rows[0]);
    }

    return { user, posts: createdPosts };
  });
};

// 실행
(async () => {
  try {
    const result = await createUserWithPost("장성현", "jsssss@gmail.com", [
      { title: "첫번째 게시물", content: "안녕 첫번째 게시물이야!" },
      { title: "두번째 게시물", content: "안녕 두번째 게시물이야!" },
    ]);

    console.log("트랜잭션 결과:", result);
  } catch (error) {
    console.error("트랜잭션 오류:", error);
  }
})();
