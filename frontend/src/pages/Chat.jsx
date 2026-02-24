import { useLocation } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import ChatWindow from "../components/chat/ChatWindow";
import Sidebar from "../components/layout/Sidebar";

export default function Chat() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const username = query.get("username");
  const room = query.get("room");

  const { messages, users, sendMessage } = useSocket(username, room);

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center p-6">
    <div className="w-full max-w-6xl h-[80vh] bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 flex overflow-hidden">
      <Sidebar users={users} room={room} />
      <ChatWindow
        messages={messages}
        sendMessage={sendMessage}
        username={username}
        room={room}
      />
    </div>
  </div>
);
}