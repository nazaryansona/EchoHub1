import { useEffect, useState } from "react";

export function usePosts({
  userId,
  search,
}: { userId?: string; search?: string } = {}) {
  const [posts, setPosts] = useState<
    {
      text: string;
      image_url: string | undefined;
      img?: string;
      id: number;
      userId: number;
      content: string;
    }[]
  >([]);

  useEffect(() => {
    // MOCKED DATA
    const mockPosts = [
      {
        id: 1,
        userId: 1,
        content: "Hello world!",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFSWYexIVAMOL34SWlIN5ol-4RA-gH-7_XA&s",
      },
      { id: 2, userId: 2, content: "React is amazing" },
      { id: 3, userId: 1, content: "Working on my profile page" },
      { id: 4, userId: 3, content: "Another user's post" },
    ];

    // Filter by userId if provided
    let filtered = userId
      ? mockPosts.filter((p) => p.userId.toString() === userId)
      : mockPosts;

    // Filter by search term if provided
    if (search) {
      filtered = filtered.filter((p) =>
        p.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    setPosts(filtered);
  }, [userId, search]);

  return { posts };
}
