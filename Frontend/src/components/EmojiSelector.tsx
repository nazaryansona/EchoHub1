import { HStack } from "@chakra-ui/react";
import Emoji from "./Emoji";

interface EmojiSelectorProps {
  emojis: { key: string; src: string }[];
  value: string;
  onChange: (emojiKey: string) => void;
}

const EmojiSelector = ({ emojis, value, onChange }: EmojiSelectorProps) => {
  return (
    <HStack spacing="10px">
      {emojis.map((e) => (
        <Emoji
          key={e.key}
          src={e.src}
          selected={value === e.key}
          onClick={() => onChange(e.key)}
        />
      ))}
    </HStack>
  );
};

export default EmojiSelector;
