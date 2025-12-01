import { GridItem } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/HomePage";
import Feed from "@/components/Feed";
import Profile from "@/components/Profile";
import CreatePost from "@/components/CreatePost";
const MainPage = () => {
  return (
    <GridItem area="main" bgColor="#1e2e3d">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile*" element={<Profile />} />
      </Routes>
    </GridItem>
  );
};

export default MainPage;
