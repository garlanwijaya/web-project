import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/sidebar.jsx";
import axios from "axios";
import "../pages.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animatedCount, setAnimatedCount] = useState(1);

  // Animasi angka Total Cash
  useEffect(() => {
    const target = 23000000;
    const duration = 5000; // 3 Detik
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(1 + (target - 1) * progress);

      setAnimatedCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);

    return () => {
      startTimestamp = null;
    };
  }, []);

  // fetch siswa data
  useEffect(() => {
    axios
      .get("http://localhost:6543/api/siswa")
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // prepare chart data by kategori
  const chartData = [
    { name: "A", value: studentData.filter((s) => s.kelas === "A").length },
    { name: "B", value: studentData.filter((s) => s.kelas === "B").length },
    { name: "C", value: studentData.filter((s) => s.kelas === "C").length },
    { name: "D", value: studentData.filter((s) => s.kelas === "D").length },
  ];
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  // generate month calendar
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const month = 5; // May (0-indexed)
  const year = 2025;
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = daysInMonth(year, month);

  // sample events
  const events = {
    6: "Idul adha 1443",
    9: "First Day Kerja Praktik",
    15: "Vivi's Birthday",
    22: "My Birthday",
    28: "Audisi Koci",
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-blue-600 text-white px-6 py-3 shadow-md select-none">
          <div className="flex items-center gap-3 font-extrabold text-lg uppercase tracking-wide">
            <svg
              className="w-8 h-8"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                cx="32"
                cy="32"
                r="30"
                stroke="white"
                strokeWidth="4"
                fill="#3b82f6"
              />
              <path d="M20 32L44 32L32 44Z" fill="white" />
            </svg>
            Dashboard
          </div>
          <div className="flex items-center gap-6">
            {/* Notifikasi dan Akun Buttons... */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow transition-colors select-none"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-grow p-8 overflow-auto bg-gray-100">
          {/* Statistik Siswa & Cash */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Distribusi Kelas Siswa</h2>
              {loading ? (
                <p className="text-gray-500">Loading chart...</p>
              ) : (
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={chartData}>
                    <Bar dataKey="value" fill="#3B82F6" />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              )}
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Jumlah siswa: {studentData.length}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-gray-600">
                    Kelas A: {studentData.filter((s) => s.kelas === "A").length}
                  </p>
                  <p className="text-gray-600">
                    Kelas B: {studentData.filter((s) => s.kelas === "B").length}
                  </p>
                  <p className="text-gray-600">
                    Kelas C: {studentData.filter((s) => s.kelas === "C").length}
                  </p>
                  <p className="text-gray-600">
                    Kelas D: {studentData.filter((s) => s.kelas === "D").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Total Cash</h2>
              <p className="text-4xl font-semibold text-green-600">
                Rp {animatedCount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Kalender Kegiatan */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Kalender Kegiatan Juni 2025
            </h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                <div key={d} className="font-semibold text-gray-600">
                  {d}
                </div>
              ))}

              {/* blank slots */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`blank-${i}`} />
              ))}

              {Array.from({ length: totalDays }).map((_, i) => {
                const day = i + 1;
                const isSunday = new Date(year, month, day).getDay() === 0;
                const hasEvent = events[day];
                const today = new Date();
                const isToday =
                  today.getDate() === day && today.getMonth() === month;
                return (
                  <div
                    key={day}
                    className={`p-2 rounded-xl transition-colors cursor-pointer select-none 
                      ${isToday ? "bg-blue-100" : "hover:bg-gray-100"}
                    `}
                  >
                    <div
                      className={`flex justify-between items-center ${
                        isSunday ? "text-red-500" : "text-gray-700"
                      }`}
                    >
                      <span className="font-medium">{day}</span>
                    </div>
                    {hasEvent && (
                      <div className="mt-1 text-xs bg-blue-200 text-blue-800 p-1 rounded">
                        {hasEvent}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
