import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ProfilePic from "./ProfilePic";
import { MdOutlineLogout } from "react-icons/md";
import monkey from "../assets/monkey.png";
import dolphin from "../assets/dolphin.png";
import fox from "../assets/fox.png";
import koala from "../assets/koala.png";
import mouse from "../assets/mouse.png";
import unicorn from "../assets/unicorn.png";
import Post from "./Post";
import { FaPlus } from "react-icons/fa6";
import style from "../styles/Profile.module.css";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import CreatePost from "./CreatePost";
import { usePosts } from "@/hooks/usePosts";
import { getCurrentUser } from "../api/auth";

const emojiImages: Record<string, string> = {
  monkey,
  dolphin,
  fox,
  koala,
  mouse,
  unicorn,
};

const Profile = ({ search }: { search: string }) => {
  const [user, setUser] = useState<{
    emoji: any;
    color: string;
    id: string;
    username: string;
    avatar_color: string;
    avatar_emoji: string;
  } | null>(null);

  const userId = user?.id || "0";
  const { posts } = usePosts({ userId, search });

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(user);

  console.log(posts);

  if (!user) return <Text color="white">Loading...</Text>;

  return (
    <Box
      bgColor={"#101e2c"}
      w={"50%"}
      h={"100%"}
      margin={"100px auto"}
      borderRadius={"15px"}
      position={"relative"}
    >
      <Box className={style.header}>
        <Box className={style.profilePic}>
          <ProfilePic
            color={user.color}
            emoji={emojiImages[user.emoji]}
            width="115px"
            height="115px"
            emojiWidth="70px"
            emojiHeight="70px"
            padding="23px"
          />
        </Box>
        <Text color={"white"} fontSize={"2xl"}>
          {user.username}
        </Text>
        <Link to="/">
          <MdOutlineLogout className={style.icon} />
        </Link>
      </Box>
      <Box className={style.genContainer}>
        <Routes>
          <Route
            index
            element={
              <>
                <Box className={style.subtleBox}>
                  <Text color={"white"} fontSize={"md"} marginTop={"8px"}>
                    My Posts
                  </Text>
                </Box>
                <Box className={style.addPostRow}>
                  <Link to="/profile/add-post">
                    <Box className={style.addPostBox}>
                      <FaPlus className={style.iconAdd} />
                      <Text className={style.addPost}>Add Post</Text>
                    </Box>
                  </Link>
                </Box>
                <Box
                  className={style.postContainer}
                  maxH="350px"
                  overflowY="auto"
                  pr="2"
                >
                  {posts.length > 0 &&
                    posts.map((p) => (
                      <Post
                        key={p.id}
                        id={p.id}
                        text={p.text}
                        img={p.image_url}
                        date={p.created_at}
                        commentsNum={p.comments_count}
                        username={p.username}
                        userColor={p.color}
                        userEmoji={p.emoji}
                      />
                    ))}
                </Box>
              </>
            }
          />
          <Route path="add-post" element={<CreatePost />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Profile;
