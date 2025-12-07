import { Box, Text } from "@chakra-ui/react";
import style from "../styles/Post.module.css";
import { useState } from "react";

interface ReactionPickerProps {
  initialReactions?: Record<string, number>;
  userReaction?: string | null;
  onReaction?: (emoji: string | null) => void;
}

const ReactionPicker = ({
  initialReactions = {
    "💙": 0,
    "😢": 0,
    "😏": 0,
    "🤨": 0,
    "😱": 0,
    "🤬": 0,
  },
  userReaction = null,
  onReaction,
}: ReactionPickerProps) => {
  const [reactions, setReactions] = useState(initialReactions);
  const [currentReaction, setCurrentReaction] = useState<string | null>(
    userReaction
  );

  const handleClick = (emoji: string) => {
    setReactions((prev) => {
      const newReactions = { ...prev };

      if (currentReaction === emoji) {
        newReactions[emoji] = Math.max((newReactions[emoji] || 1) - 1, 0);
        setCurrentReaction(null);
        onReaction?.(null);
      } else {
        if (currentReaction) {
          newReactions[currentReaction] = Math.max(
            (newReactions[currentReaction] || 1) - 1,
            0
          );
        }
        newReactions[emoji] = (newReactions[emoji] || 0) + 1;
        setCurrentReaction(emoji);
        onReaction?.(emoji);
      }

      return newReactions;
    });
  };

  return (
    <Box width="60%" display="flex" gap={3} marginLeft="10px">
      {Object.entries(reactions).map(([emoji, count]) => (
        <Box
          key={emoji}
          display="flex"
          alignItems="center"
          gap={1}
          cursor="pointer"
          style={{
            borderRadius: "40%",
            backgroundColor:
              currentReaction === emoji ? "#293e51" : "transparent",
          }}
        >
          <Text
            className={style.emoji}
            fontSize="xl"
            onClick={() => handleClick(emoji)}
          >
            {emoji}
          </Text>
          {count > 0 && (
            <Text color="white" fontSize="sm">
              {count}{" "}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ReactionPicker;
