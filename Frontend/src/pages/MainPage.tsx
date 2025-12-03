import { GridItem } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/HomePage";
import Feed from "@/components/Feed";
import Profile from "@/components/Profile";

const MainPage = ({ search }: { search: string }) => {
  return (
    <GridItem area="main" bgColor="#1e2e3d">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed search={search} />} />
        <Route path="/profile*" element={<Profile search={search} />} />
      </Routes>
    </GridItem>
  );
};

export default MainPage;
