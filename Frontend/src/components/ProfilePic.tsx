import { Box } from "@chakra-ui/react";

interface ProfilePicProps {
  color: string; // background color
  emoji: string; // path to emoji image
  width?: string;
  height?: string;
  emojiWidth?: string;
  emojiHeight?: string;
  padding?: string;
}

const ProfilePic = ({
  color,
  emoji,
  width = "100px",
  height = "100px",
  emojiWidth = "50px",
  emojiHeight = "50px",
  padding = "15px",
}: ProfilePicProps) => {
  return (
    <Box
      w={width}
      h={height}
      bgColor={color}
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      p={padding}
    >
      <img
        src={emoji}
        alt="emoji"
        style={{
          width: emojiWidth,
          height: emojiHeight,
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default ProfilePic;
