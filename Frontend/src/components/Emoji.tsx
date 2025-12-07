import { Image } from "@chakra-ui/react";

interface EmojiProps {
  src: string;
  size?: string;
  selected?: boolean;
  onClick?: () => void;
}

const Emoji = ({ src, size, selected = false, onClick }: EmojiProps) => {
  return (
    <Image
      src={src}
      boxSize={size || "35px"}
      aspectRatio={1}
      objectFit="cover"
      objectPosition="center"
      borderRadius="full"
      bg="white"
      cursor={onClick ? "pointer" : "auto"}
      border={selected ? "1px solid rgb(20, 23, 56)" : "none"}
      transition="all 0.15s ease"
      onClick={onClick}
      _hover={onClick ? { transform: "scale(1.12)" } : {}}
    />
  );
};

export default Emoji;
