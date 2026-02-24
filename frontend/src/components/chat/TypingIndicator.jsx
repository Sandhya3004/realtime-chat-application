export default function TypingIndicator({ user }) {
  if (!user) return null;

  return (
    <div className="text-sm text-gray-400 italic px-4 pb-2">
      {user} is typing...
    </div>
  );
}