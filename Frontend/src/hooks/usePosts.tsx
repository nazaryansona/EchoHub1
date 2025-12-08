import { useEffect, useState } from "react";
import api from "../api/apiClient";

interface PostType {
  id: number;
  text: string;
  image_url?: string | null;
  created_at: string;
  comments_count: number;
  reactions_count: number;
  username?: string;
  color?: string;
  emoji?: string;
}

export function usePosts({
  userId,
  search,
}: { userId?: string; search?: string } = {}) {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res =
          userId && userId !== "0"
            ? await api.get("/posts/me")
            : await api.get("/posts/feed");

        let data: PostType[] = res.data;

        data = data.map((p) => ({
          ...p,
          image_url: p.image_url
            ? `http://localhost:3000${p.image_url}`
            : undefined,
        }));

        if (search) {
          data = data.filter((p) =>
            p.text?.toLowerCase().includes(search.toLowerCase())
          );
        }

        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };

    fetchPosts();
  }, [userId, search]);

  return { posts };
}
