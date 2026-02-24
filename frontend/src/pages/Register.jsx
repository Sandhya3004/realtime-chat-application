import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await api.post("/auth/register", { username, password });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96 border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <input
          className="w-full p-3 mb-4 rounded-xl bg-white/20"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded-xl bg-white/20"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-xl"
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Already have account?{" "}
          <Link to="/" className="text-indigo-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}