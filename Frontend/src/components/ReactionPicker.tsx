import { Box, Text } from "@chakra-ui/react";
import style from "../styles/Post.module.css";

const ReactionPicker = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <Box width="60%" display="flex" gap={1} marginLeft={"10px"}>
      <Text className={style.emoji} fontSize={"xl"} onClick={handleClick}>
        💙
      </Text>
      <Text className={style.emoji} fontSize={"xl"} onClick={handleClick}>
        😢
      </Text>
      <Text className={style.emoji} fontSize={"xl"} onClick={handleClick}>
        😏
      </Text>
      <Text className={style.emoji} fontSize={"xl"} onClick={handleClick}>
        🤨
      </Text>
      <Text className={style.emoji} fontSize={"xl"} onClick={handleClick}>
        😱
      </Text>
      <Text className={style.emoji} fontSize={"xl"} onClick={handleClick}>
        🤬
      </Text>
    </Box>
  );
};

export default ReactionPicker;
