import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";

export default function ChatWindow({
  messages,
  sendMessage,
  username,
  room,
}) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 p-4 bg-gray-50">
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-white to-blue-50">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg}
            isOwn={msg.sender === username}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <MessageInput
        onSend={sendMessage}
        username={username}
        room={room}
      />
    </div>
  );
}