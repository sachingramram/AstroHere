import { useParams } from "react-router-dom";
import { useState } from "react";

const SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

export default function Horoscope() {
  const { sign: paramSign } = useParams();
  const [sign, setSign] = useState(paramSign || "Aries");

  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-extrabold gradient-text">Daily Horoscope</h1>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr,2fr]">
          {/* Controls */}
          <div className="card">
            <label className="text-sm font-semibold">Choose your sign</label>
            <select
              value={sign}
              onChange={(e) => setSign(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white/70 px-3 py-2"
            >
              {SIGNS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Result */}
          <div className="card">
            <h2 className="text-xl md:text-2xl font-bold gradient-text">{sign}</h2>
            <p className="mt-2 text-gray-700">
              (Demo text) Today is a great day to trust your instincts and take small, joyful risks.
            </p>
          </div>
        </div>

        {/* Suggestions grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Love","Career","Wellbeing"].map((t,i)=>(
            <div key={i} className="card">
              <div className="text-lg font-semibold gradient-text">{t}</div>
              <p className="text-sm mt-1 text-gray-700">
                A short, uplifting tip for {t.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
