export default function Sidebar({ users, room }) {
  return (
    <div className="w-64 bg-blue-50 p-4 border-r border-blue-100">
      <h2 className="text-lg font-bold text-blue-900">Room: {room}</h2>

      <h3 className="mb-2 font-semibold">Active Users</h3>

      <ul className="space-y-2">
        {users?.map((user, index) => (
          <li
          key={index}
          className="bg-white p-2 rounded-lg text-sm text-gray-800 shadow-sm border border-gray-200 hover:bg-blue-100 transition-all duration-200"
        >
          {user}
        </li>
        ))}
      </ul>
    </div>
  );
}