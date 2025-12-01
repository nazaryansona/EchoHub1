import { Box, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

interface ProfilePicProps {
  color: string;
  emoji: string;
  className?: string;
  width?: string;
  height?: string;
  margin?: string;
  emojiWidth?: string;
  emojiHeight?: string;
  padding?: string;
}

const ProfilePic = ({
  color,
  emoji,
  width,
  height,
  margin,
  emojiWidth,
  emojiHeight,
  padding,
}: ProfilePicProps) => {
  return (
    <Box
      width={width || "70px"}
      height={height || "70px"}
      borderRadius="50%"
      padding={padding || "10px"}
      backgroundColor={color}
    >
      {emoji && (
        <Image
          src={emoji}
          width={emojiWidth || "50px"}
          height={emojiHeight || "50px"}
          padding={"auto"}
          margin={margin}
        />
      )}
    </Box>
  );
};

export default ProfilePic;
