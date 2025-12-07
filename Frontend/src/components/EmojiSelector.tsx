import { HStack } from "@chakra-ui/react";
import Emoji from "./Emoji";

interface EmojiSelectorProps {
  emojis: string[];
  value: string;
  onChange: (emoji: string) => void;
}

const EmojiSelector = ({ emojis, value, onChange }: EmojiSelectorProps) => {
  return (
    <HStack spacing="10px">
      {emojis.map((e) => (
        <Emoji
          key={e}
          src={e}
          selected={value === e}
          onClick={() => onChange(e)}
        />
      ))}
    </HStack>
  );
};

export default EmojiSelector;
