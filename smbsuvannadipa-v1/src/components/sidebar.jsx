import { NavLink } from "react-router-dom";
import "./components.css";

export default function Sidebar() {
  return (
    <nav className="w-64 bg-blue-900 text-blue-100 flex flex-col p-6 space-y-6 select-none">
      <div className="text-2xl font-extrabold tracking-widest text-center mb-6">
        Suvanna Dipa
      </div>
      <ul className="flex flex-col space-y-3 flex-grow">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
              isActive && !isPending
                ? "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold shadow-md shadow-black/20 bg-blue-700 transition-all duration-300"
                : "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300"
            }
            aria-current="page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6M21 21H3v-6h18v6z"
              />
            </svg>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/daftarsiswa"
            className={({ isActive, isPending }) =>
              isActive && !isPending
                ? "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold shadow-md shadow-black/20 bg-blue-700 transition-all duration-300"
                : "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A7 7 0 1118.88 6.196M12 14a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
            Daftar Siswa
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
