import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const token = res.data;

      localStorage.setItem("token", token);

      login(username);

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl mb-6 text-center font-bold">
          Login 🚀
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 py-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}