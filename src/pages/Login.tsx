// frontend/src/pages/Login.tsx
import { useState } from "react";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const nav = useNavigate();

  async function onSubmit(e: any) {
    e.preventDefault();
    setError("");
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" } // wrapper will merge
      });
      if (res.api_key) {
        sessionStorage.setItem("API_KEY", res.api_key);
        nav("/atlas"); // or wherever FRAAtlas page is
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "Login error");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Officer Login</h2>
      <form onSubmit={onSubmit}>
        <label className="block mb-2">Username</label>
        <input className="w-full mb-3 p-2 border" value={username} onChange={e=>setUsername(e.target.value)} />
        <label className="block mb-2">Password</label>
        <input type="password" className="w-full mb-3 p-2 border" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
      {error && <div className="mt-3 text-red-600">{error}</div>}
    </div>
  );
}
