import { Box } from "@chakra-ui/react";
import Post from "./Post";
import { usePosts } from "@/hooks/usePosts";
import style from "../styles/Feed.module.css";

const Feed = ({ search }: { search: string }) => {
  const { posts } = usePosts({ search });

  return (
    <Box
      className={style.container}
      bgColor="#101e2c"
      w="50%"
      h="95vh"
      margin="auto"
      borderRadius="15px"
      overflowY="auto"
    >
      <Box width="80%" margin="auto">
        {posts.map((p) => (
          <Post
            key={p.id}
            id={p.id}
            text={p.text}
            img={p.image_url}
            date={p.created_at}
            username={p.username}
            userColor={p.color}
            userEmoji={p.emoji}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Feed;
