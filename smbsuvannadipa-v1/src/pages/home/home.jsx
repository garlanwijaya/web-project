import Navbar from "../../components/navbar.jsx";
import "../pages.css";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-screen w-screen flex flex-col">
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-wide">
          Welcome to the SMB Suvanna Dipa
        </h1>
        <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 pt-4">
          Sabbe Satta Bhavantu Sukhitata - Semoga semua makhluk berbahagia
        </p>
      </div>
    </div>
  );
}