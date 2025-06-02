import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import Signup from "./pages/signup/signup.jsx";
import Login from "./pages/login/login.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Daftarsiswa from "./pages/daftarsiswa/daftarsiswa.jsx";

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/daftarsiswa"
            element={
              <PrivateRoute>
                <Daftarsiswa />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

