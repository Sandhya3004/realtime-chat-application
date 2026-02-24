import EmojiPicker from "emoji-picker-react";

export default function EmojiPickerBox({ onEmojiClick }) {
  return (
    <div className="absolute bottom-20">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
}