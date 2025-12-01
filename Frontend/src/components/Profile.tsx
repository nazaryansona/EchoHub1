import { Box, Text } from "@chakra-ui/react";
import ProfilePic from "./ProfilePic";
import { MdOutlineLogout } from "react-icons/md";
import monkey from "../assets/monkey.png";
import Post from "./Post";
import { FaPlus } from "react-icons/fa6";
import style from "../styles/Profile.module.css";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import CreatePost from "./CreatePost";

const Profile = () => {
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
            color="#269D28"
            emoji={monkey}
            width="115px"
            height="115px"
            emojiWidth="70px"
            emojiHeight="70px"
            padding="23px"
          />
        </Box>
        <Text color={"white"} fontSize={"2xl"}>
          Username
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
                <Box className={style.postContainer}>
                  <Post />
                </Box>
              </>
            }
          ></Route>
          <Route path="add-post" element={<CreatePost />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Profile;
