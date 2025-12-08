import { Card, Field, Input, Button, Stack, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import ColorInput from "./ColorInput";
import ProfilePic from "./ProfilePic";
import EmojiSelector from "./EmojiSelector";
import dolphin from "../assets/dolphin.png";
import fox from "../assets/fox.png";
import koala from "../assets/koala.png";
import monkey from "../assets/monkey.png";
import unicorn from "../assets/unicorn.png";
import mouse from "../assets/mouse.png";
import { useNavigate } from "react-router-dom";

import style from "../styles/LoginForm.module.css";
import { signupUser, loginUser, previewUsername } from "../api/auth";

export const emojiImages: Record<string, string> = {
  monkey,
  dolphin,
  fox,
  koala,
  mouse,
  unicorn,
};
const LoginForm = () => {
  const [signUp, setSignUp] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#eb5e41");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const navigate = useNavigate();

  const emojiOptions = [
    { key: "monkey", src: emojiImages.monkey },
    { key: "dolphin", src: emojiImages.dolphin },
    { key: "fox", src: emojiImages.fox },
    { key: "koala", src: emojiImages.koala },
    { key: "mouse", src: emojiImages.mouse },
    { key: "unicorn", src: emojiImages.unicorn },
  ];

  const handleToggle = () => {
    setSignUp(!signUp);
    setError("");
    setPassword("");
    setUsername("");
    setSelectedEmoji("");
    setSelectedColor("#eb5e41");
    setResultMessage("");
  };

  const handleEmojiChange = async (emojiKey: string) => {
    setSelectedEmoji(emojiKey);

    try {
      const data = await previewUsername(emojiKey);
      setUsername(data.username);
    } catch (err) {
      console.log("Preview username error:", err);
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (!/[A-Za-z]/.test(password)) {
      return "Password must contain at least one letter.";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }

    return null; // valid
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResultMessage("");

    try {
      if (signUp) {
        if (!selectedEmoji) {
          setError("Please select an emoji");
          setLoading(false);
          return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
          setError(passwordError);
          setLoading(false);
          return;
        }

        const data = await signupUser(password, selectedColor, selectedEmoji);
        setResultMessage(`Your username is: ${data.username}`);
        setTimeout(() => {
          navigate("/feed");
        }, 1500);
      } else {
        if (!username || !password) {
          setError("Please enter username and password");
          setLoading(false);
          return;
        }

        const data = await loginUser(username, password);
        setResultMessage("Logged in!");
        setTimeout(() => {
          navigate("/feed");
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
                  />

                  <Text>Emoji</Text>
                  <EmojiSelector
                    emojis={emojiOptions}
                    value={selectedEmoji}
                    onChange={handleEmojiChange}
                  />
                </Box>

                <Box height={"100%"}>
                  <ProfilePic
                    color={selectedColor}
                    emoji={emojiImages[selectedEmoji]}
                  />
                </Box>
              </Box>
            </>
          )}

          {/* Username field (always shown) */}
          <Field.Root>
            <Field.Label fontWeight="medium">Username</Field.Label>
            <Input
              value={username}
              onChange={
                !signUp ? (e) => setUsername(e.target.value) : undefined
              }
              placeholder={
                signUp
                  ? "Your username will be generated automatically"
                  : "Username"
              }
              borderRadius="3xl"
              backgroundColor="#F3F4F6"
              border="none"
              disabled={signUp}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label fontWeight="medium">Password</Field.Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              borderRadius="3xl"
              backgroundColor="#F3F4F6"
              border="none"
            />
          </Field.Root>

          {error && <Text color="red.500">{error}</Text>}
          {resultMessage && <Text color="green.600">{resultMessage}</Text>}
        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
        <Button
          variant="solid"
          width="full"
          borderRadius="3xl"
          backgroundColor="#1E2E3D"
          onClick={handleSubmit}
          loading={loading}
        >
          {signUp ? "Sign up" : "Log in"}
        </Button>
      </Card.Footer>

      {signUp ? (
        <Text margin="-17px 0px 16px 69px" fontSize="sm">
          Been here before?{" "}
          <a className={style.link} onClick={handleToggle}>
            Log in
          </a>
        </Text>
      ) : (
        <Text margin="-10px 0px 31px 44px" fontSize="sm">
          Don't have an account yet?{" "}
          <a className={style.link} onClick={handleToggle}>
            Sign up
          </a>
        </Text>
      )}
    </Card.Root>
  );
};

export default LoginForm;
