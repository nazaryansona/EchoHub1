import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import ProfilePic from "../components/ProfilePic";
import monkey from "../assets/monkey.png";
import unicorn from "../assets/unicorn.png";
import dolphin from "../assets/dolphin.png";
import style from "../styles/MainPage.module.css";
const HomePage = () => {
  return (
    <GridItem textAlign={"center"}>
      <Box className={style.container}>
        <Box margin-left="-20px" className={style.box1}>
          <Grid templateColumns="repeat(3, 0fr)" gap="7" margin={"3px 18%"}>
            <ProfilePic color="#269D28" emoji={monkey} />
            <ProfilePic color="#0079C4" emoji={unicorn} />
            <ProfilePic color="#5933BA" emoji={dolphin} />
          </Grid>
          <Text
            fontWeight="bold"
            marginTop={"30px"}
            color={"white"}
            fontSize={"3xl"}
          >
            Every confession leaves an echo
          </Text>
          <Text fontWeight="medium" color={"white"} fontSize={"2xl"}>
            What will yours sound like?
          </Text>
        </Box>
        <Box className={style.box2} marginLeft={"8%"}>
          <LoginForm />
        </Box>
      </Box>
      <Box className={style.transpCircle} bottom="-215px" left="-94px"></Box>
      <Box className={style.transpCircle} right="-241px" bottom="75px"></Box>
    </GridItem>
  );
};

export default HomePage;
