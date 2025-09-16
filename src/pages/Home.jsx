// src/pages/Home.jsx
import { Link } from "react-router-dom";
import HoroscopeCard from "../components/HoroscopeCard.jsx";
import ZodiacGrid from "../components/ZodiacGrid.jsx";
import { ZODIAC } from "../data/zodiac.js";
import { getDailyHoroscope } from "../utils/api.js";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 sm:py-12 md:py-14 space-y-8 sm:space-y-10 md:space-y-12">
      {/* Hero */}
      <div className="card relative overflow-hidden p-6 sm:p-8 md:p-12">
        {/* soft gradient orbs, scaled for small screens */}
        <div
          className="pointer-events-none select-none absolute -right-6 sm:-right-8 md:-right-10 -top-8 sm:-top-10 size-24 sm:size-32 md:size-40 rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,.6), transparent 60%)" }}
        />
        <div
          className="pointer-events-none select-none absolute -left-8 sm:-left-10 md:-left-12 -bottom-10 sm:-bottom-12 size-40 sm:size-48 md:size-56 rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,.6), transparent 60%)" }}
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Your <span className="gradient-text">Daily Astrology</span>, modern & fun
        </h1>

        <p className="mt-3 max-w-prose text-gray-700">
          Check horoscopes, test compatibility, and preview your birth chart—styled with
          glossy glass cards and vibrant gradients.
        </p>

        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
          <Link className="btn btn-primary min-h-[44px]" to="/horoscope" aria-label="Read Horoscope">
            Read Horoscope
          </Link>
          <Link className="btn btn-outline min-h-[44px]" to="/compatibility" aria-label="Try Compatibility">
            Try Compatibility
          </Link>
          <Link className="btn btn-outline min-h-[44px]" to="/birth-chart" aria-label="Birth Chart">
            Get Your Birth Chart using Gemini AI
          </Link>
          <Link className="btn btn-outline min-h-[44px]" to="/ai" aria-label="Gemini AI">
            Talk With AI(Gemini)
          </Link>
          <span className="pill min-h-[36px]">No login • Super fast ⚡</span>
        </div>
      </div>

      {/* Today’s picks */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold">Today’s Highlights</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {ZODIAC.slice(0, 6).map((z) => {
            const data = getDailyHoroscope(z.key);
            return (
              <HoroscopeCard
                key={z.key}
                sign={z.name}
                dateRange={z.range}
                summary={data.sections[0].text}
              />
            );
          })}
        </div>
      </div>

      {/* Browse all */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold">Browse All Signs</h2>
        <ZodiacGrid />
      </div>
    </section>
  );
}
