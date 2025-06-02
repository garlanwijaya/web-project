import { NavLink } from "react-router-dom";
import "./components.css";

export default function Navbar(){
  return (
    <nav className="navbar flex justify-between items-center p-4 font-bold">
      <div className="logo">
        <h1 className="cursor-default">SMB Suvanna Dipa</h1>
      </div>
      <ul className="nav-links flex gap-4 items-center">
        <li className="hover:text-white transition-all duration-300">
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li className="bg-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300">
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  )
}