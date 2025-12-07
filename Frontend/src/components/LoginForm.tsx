import {
  Card,
  Field,
  Input,
  Button,
  Stack,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import ColorInput from "./ColorInput";
import dolphin from "../assets/dolphin.png";
import fox from "../assets/fox.png";
import koala from "../assets/koala.png";
import monkey from "../assets/monkey.png";
import unicorn from "../assets/unicorn.png";
import mouse from "../assets/mouse.png";
import style from "../styles/LoginForm.module.css";
import ProfilePic from "./ProfilePic";
import EmojiSelector from "./EmojiSelector";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [signUp, setSignUp] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#eb5e41");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const emojiOptions = [monkey, dolphin, unicorn, mouse, fox, koala];
  const handleClick = () => {
    setSignUp(!signUp);
  };

  return (
    <Card.Root
      maxW="xs"
      height={"fit-content"}
      borderRadius="xl"
      padding="4px"
      bg="white"
      boxShadow="lg"
    >
      <Card.Header>
        <Card.Title textAlign="center" fontSize="2xl" fontWeight="semibold">
          {signUp ? "Create an account" : "Log in"}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          {signUp && (
            <>
              <Text textStyle="sm">Choose your avatar</Text>
              <Box className={style.profileContainer}>
                <Box>
                  <ColorInput
                    value={selectedColor}
                    onChange={setSelectedColor}
                  ></ColorInput>
                  <Text>Emoji</Text>
                  <EmojiSelector
                    emojis={emojiOptions}
                    value={selectedEmoji}
                    onChange={setSelectedEmoji}
                  />
                </Box>
                <Box height={"100%"}>
                  <ProfilePic
                    color={selectedColor}
                    emoji={selectedEmoji}
                  ></ProfilePic>
                </Box>
              </Box>
            </>
          )}
          <Field.Root>
            <Field.Label fontWeight="medium">Username</Field.Label>
            <Input
              placeholder="Username"
              borderRadius="3xl"
              backgroundColor="#F3F4F6"
              border="none"
              _focus={{
                outline: "none",
                boxShadow: "0 0 0 1px rgb(22, 52, 85)",
              }}
            />
            {signUp && (
              <Text fontSize="xs" marginLeft="5px" color="gray">
                your username will be generated automatically
              </Text>
            )}
          </Field.Root>
          <Field.Root>
            <Field.Label fontWeight="medium">Password</Field.Label>
            <Input
              placeholder="Password"
              borderRadius="3xl"
              backgroundColor="#F3F4F6"
              border="none"
              _focus={{
                outline: "none",
                boxShadow: "0 0 0 1px rgb(22, 52, 85)",
              }}
            />
          </Field.Root>
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Link to={"/feed"}>
          <Button
            variant="solid"
            width="full"
            borderRadius="3xl"
            backgroundColor="#1E2E3D"
          >
            {signUp ? "Sign up" : "Log in"}
          </Button>
        </Link>
      </Card.Footer>
      {signUp ? (
        <Text margin="-17px 0px 16px 69px" fontSize="sm">
          Been here before?{" "}
          <a className={style.link} onClick={handleClick}>
            Log in
          </a>
        </Text>
      ) : (
        <Text margin="-10px 0px 31px 44px" fontSize="sm">
          Don't have an account yet?{" "}
          <a className={style.link} onClick={handleClick}>
            Sign up
          </a>
        </Text>
      )}
    </Card.Root>
  );
};

export default LoginForm;
