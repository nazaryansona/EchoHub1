"use client";

import { ColorPicker, HStack, Portal, parseColor } from "@chakra-ui/react";

interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
}
const ColorInput = ({ value, onChange }: ColorInputProps) => {
  return (
    <ColorPicker.Root
      defaultValue={parseColor("#eb5e41")}
      value={parseColor(value)}
      onValueChange={(details) => {
        const hex = details.value.toString("hex");
        onChange(hex);
      }}
      maxW="150px"
    >
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
            </HStack>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  );
};

export default ColorInput;
