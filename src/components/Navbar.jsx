import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const item =
  "tap nav-underline px-3 py-2 rounded-xl text-sm font-semibold transition hover:bg-white/60 backdrop-blur";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
      <div className="container h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 tap">
          <span
            className="inline-grid size-9 place-items-center rounded-2xl text-white font-black"
            style={{ background: "linear-gradient(135deg, rgb(236 72 153), rgb(99 102 241))" }}
          >
            ✦
          </span>
          <span className="text-lg font-bold gradient-text">AstroVeda</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${item} ${isActive ? "active bg-white/70" : ""}`}>Home</NavLink>
          <NavLink to="/horoscope" className={({ isActive }) => `${item} ${isActive ? "active bg-white/70" : ""}`}>Horoscope</NavLink>
          <NavLink to="/compatibility" className={({ isActive }) => `${item} ${isActive ? "active bg-white/70" : ""}`}>Compatibility</NavLink>
          <NavLink to="/birth-chart" className={({ isActive }) => `${item} ${isActive ? "active bg-white/70" : ""}`}>Birth Chart</NavLink>
          <NavLink to="/ai" className={({ isActive }) => `${item} ${isActive ? "active bg-white/70" : ""}`}>AI Chat</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${item} ${isActive ? "active bg-white/70" : ""}`}>About</NavLink>
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/70 px-3 py-2 tap"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/50 bg-white/80 backdrop-blur">
          <div className="container py-3 flex flex-col gap-1">
            <NavLink to="/" end className={item} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/horoscope" className={item} onClick={() => setOpen(false)}>Horoscope</NavLink>
            <NavLink to="/compatibility" className={item} onClick={() => setOpen(false)}>Compatibility</NavLink>
            <NavLink to="/birth-chart" className={item} onClick={() => setOpen(false)}>Birth Chart</NavLink>
            <NavLink to="/ai" className={item} onClick={() => setOpen(false)}>AI Chat</NavLink>
            <NavLink to="/about" className={item} onClick={() => setOpen(false)}>About</NavLink>
            <div className="pt-2"><ThemeToggle /></div>
          </div>
          {/* iOS safe-area breathing room */}
          <div className="pb-[var(--safe-bottom)]" />
        </div>
      )}
    </header>
  );
}
