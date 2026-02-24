export default function MessageBubble({ message, isOwn }) {

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (message.type === "JOIN" || message.type === "LEAVE") {
    return (
      <div className="text-center text-gray-400 text-sm my-2">
        {message.sender} {message.type === "JOIN" ? "joined" : "left"} the room
        <span className="ml-2 text-xs text-gray-500">
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-xl max-w-xs shadow ${
          isOwn
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
            : "bg-white text-gray-800 border border-gray-200 shadow-sm"
        }`}
      >
        <div className="flex justify-between text-xs mb-1">
          <span className="font-semibold">{message.sender}</span>
          <span className="text-gray-300">
            {formatTime(message.timestamp)}
          </span>
        </div>

        <div>{message.content}</div>
      </div>
    </div>
  );
}