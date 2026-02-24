import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!username || !room) return;
    navigate(`/chat?username=${username}&room=${room}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-96 space-y-6">
        
        <h1 className="text-3xl font-bold text-center text-white">
          🚀 Join Chat Room
        </h1>

        <input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          placeholder="Enter Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 p-3 rounded-lg font-semibold text-white"
        >
          Join Room
        </button>

      </div>
    </div>
  );
}