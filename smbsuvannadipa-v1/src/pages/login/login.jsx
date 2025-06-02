import { useState, useEffect } from "react";
import "../pages.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (isAuthenticating) {
      const timeout = setTimeout(() => {
        setIsAuthenticating(false);
      }, 3000); // Reset after 3 seconds for demonstration

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    try {
      const response = await fetch("http://localhost:6543/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.status === "success") {
        sessionStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Terjadi kesalahan: " + error.message);
    } finally {
      setIsAuthenticating(false);
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
        <h1 className="text-3xl text-center font-bold mb-4">Login</h1>
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
          <br />
          <label className="mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 block w-full"
            />
          </label>
          <br />
          {error && (
            <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            {isAuthenticating ? "Authenticating..." : "Login"}
          </button>

          <p className="mt-4 text-center">
            Belum punya akun?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Daftar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
