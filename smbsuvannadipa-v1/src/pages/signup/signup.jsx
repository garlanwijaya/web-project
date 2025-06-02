import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages.css";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Username dan password harus diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch("http://localhost:6543/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await resp.json();

      if (!resp.ok) {
        // pesan error dari backend, misal 400 atau 409
        setError(result.message || "Signup gagal");
      } else {
        // sukses → langsung redirect ke login
        navigate("/login");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 flex flex-col items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-100">
        <span
          className="font-bold text-3xl cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          &times;
        </span>
        <h1 className="text-3xl text-center font-bold mb-4">Signup</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 block w-full"
            />
          </label>

          <label className="mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 block w-full"
            />
          </label>

          {error && <p className="text-red-500 text-sm mb-2 mt-8">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Mendaftarkan..." : "Signup"}
          </button>

          <p className="text-center mt-4">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline transition-all duration-300"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
