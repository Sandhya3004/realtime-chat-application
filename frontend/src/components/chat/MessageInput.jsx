import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({ onSend, username, room }) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const send = () => {
    if (!message.trim()) return;

    onSend({
      sender: username,
      content: message,
      room,
    });

    setMessage("");
  };

  return (
    <div className="p-4 bg-gray-900 border-t border-gray-800 relative">
      {showEmoji && (
        <div className="absolute bottom-16">
          <EmojiPicker
            onEmojiClick={(emojiData) =>
              setMessage((prev) => prev + emojiData.emoji)
            }
          />
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="bg-gray-700 px-3 rounded-lg text-white"
        >
          😊
        </button>

        <input
          type="text"
          className="flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />

        <button
          onClick={send}
          className="bg-green-500 px-4 rounded-lg font-semibold text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}