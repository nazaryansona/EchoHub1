import { Button, Card, HStack, Stack, Text, Image } from "@chakra-ui/react";
import ProfilePic from "./ProfilePic";
import monkey from "../assets/monkey.png";
import ReactionPicker from "./ReactionPicker";
import { FaRegComment } from "react-icons/fa";

import style from "../styles/Post.module.css";
import { useState } from "react";

interface PostProps {
  img?: string;
  text: string;
  username?: string;
  date?: string;
  commentsNum?: number;
}

const Post = ({ img, text, username, date, commentsNum }: PostProps) => {
  const [commentSect, setCommentSect] = useState(false);

  const handleClick = () => {
    setCommentSect(!commentSect);
  };
  return (
    <Card.Root className={style.card}>
      <Card.Body>
        <HStack mb="6" gap="3">
          <ProfilePic
            color="#269D28"
            emoji={monkey}
            width="45px"
            height="45px"
            emojiHeight="27px"
            emojiWidth="27px"
          />
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm" color={"white"}>
              {username ? username : "Username"}
            </Text>
            <Text textStyle="xs" color={"white"}>
              {date ? date : "Date"}
            </Text>
          </Stack>
        </HStack>
        <Card.Description color={"white"}>
          {text
            ? text
            : "lorem ipsum dolor sit amet consectetur adipisicing elit"}
          {img && (
            <Image
              src={img}
              margin={"auto"}
              width={"100%"}
              borderRadius={"8px"}
              marginTop={"10px"}
            />
          )}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <ReactionPicker handleClick={() => {}} />
        <Button
          className={style.commentButton}
          width={"40%"}
          onClick={() => handleClick()}
        >
          <FaRegComment />
          Comments {commentsNum ? commentsNum : 0}
        </Button>
      </Card.Footer>
      {commentSect && (
        <Card.Body>
          <Card.Description color={"white"}>
            <ProfilePic color="#269D28" emoji={monkey} />
            {text
              ? text
              : "lorem ipsum dolor sit amet consectetur adipisicing elit"}
          </Card.Description>
        </Card.Body>
      )}
    </Card.Root>
  );
};

export default Post;
