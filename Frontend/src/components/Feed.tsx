import { Box } from "@chakra-ui/react";
import Post from "./Post";
import style from "../styles/Feed.module.css";

const Feed = () => {
  return (
    <>
      <Box
        className={style.container}
        bgColor={"#101e2c"}
        w={"50%"}
        h={"95vh"}
        margin={" auto"}
        borderRadius={"15px"}
        position={"relative"}
        overflowY={"auto"}
      >
        <Box width={"80%"} margin={"auto"}>
          <Post
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-MKjqBrUbY2XxX-8o4J0NVXb2N3jOmf5rNg&s"
            text={
              "post 1 post 1 v post 1 post 1 post 1 post 1 post 1 post 1 post 1 post 1 "
            }
          />
          <Post
            text={
              "post 2 post 2 post 2 post 2 post 2 post 2 post 2 post 2 post 2 post 2 "
            }
          />
          <Post
            text={
              "post 3 post 3 post 3 post 3 post 3 post 3 post 3 post 3 post 3 post 3 "
            }
          />
          <Post
            text={
              "post 4 post 4 post 4 post 4 post 4 post 4 post 4 post 4 post 4 post 4 "
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default Feed;
