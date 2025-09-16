import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Horoscope from "./pages/Horoscope.jsx";
import Compatibility from "./pages/Compatibility.jsx";
import BirthChart from "./pages/BirthChart.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import GeminiChat from "./pages/GeminiChat.jsx"; // ← add

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horoscope/:sign?" element={<Horoscope />} />
          <Route path="/compatibility" element={<Compatibility />} />
          <Route path="/birth-chart" element={<BirthChart />} />
          <Route path="/ai" element={<GeminiChat />} /> {/* ← add */}
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
