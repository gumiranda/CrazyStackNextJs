import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  return (
    <Picker
      data={data}
      onEmojiSelect={(emoji: any) => onEmojiSelect(emoji.native)}
      theme="light"
      showPreview={false}
      showSkinTones={false}
      emojiSize={20}
      emojiButtonSize={28}
      maxFrequentRows={4}
    />
  );
};

export default EmojiPicker;
