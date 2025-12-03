import { Button, Card, HStack, Stack, Text, Image } from "@chakra-ui/react";
import ProfilePic from "./ProfilePic";
import monkey from "../assets/monkey.png";
import ReactionPicker from "./ReactionPicker";
import { FaRegComment } from "react-icons/fa";
import CommentSection from "./CommentSection";

import style from "../styles/Post.module.css";
import { useState } from "react";

interface PostProps {
  id: number; // <-- unique identifier for the post
  img?: string;
  text: string;
  username?: string;
  date?: string;
  commentsNum?: number;
}

const Post = ({ id, img, text, username, date, commentsNum }: PostProps) => {
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
            <Text fontWeight="semibold" color="white">
              {username || "Username"}
            </Text>
            <Text color="white">{date || "Date"}</Text>
          </Stack>
        </HStack>

        <Card.Description color="white">
          {text}
          {img && <Image src={img} width="100%" borderRadius="8px" mt="10px" />}
        </Card.Description>
      </Card.Body>

      <Card.Footer>
        <ReactionPicker />
        <Button
          className={style.commentButton}
          width="40%"
          onClick={handleClick}
        >
          <FaRegComment />
          Comments {commentsNum ?? 0}
        </Button>
      </Card.Footer>

      {commentSect && <CommentSection postId={id} />}
    </Card.Root>
  );
};

export default Post;
