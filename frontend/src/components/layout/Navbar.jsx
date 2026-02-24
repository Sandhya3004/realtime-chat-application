export default function Navbar() {
  return (
    <div className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Realtime Chat</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location = "/";
        }}
        className="bg-red-500 px-4 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}