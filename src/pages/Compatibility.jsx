import { useState, useMemo } from "react";

const SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

export default function Compatibility() {
  const [a, setA] = useState("Aries");
  const [b, setB] = useState("Leo");

  const score = useMemo(() => {
    const base = (SIGNS.indexOf(a) + SIGNS.indexOf(b)) % 100;
    return 60 + (base % 41);
  }, [a, b]);

  const percent = Math.round(score);

  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-extrabold gradient-text">Compatibility</h1>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Form */}
          <div className="card grid gap-3">
            <div>
              <label className="text-sm font-semibold">Person A</label>
              <select className="mt-1 w-full rounded-2xl border border-white/60 bg-white/70 px-3 py-2" value={a} onChange={(e)=>setA(e.target.value)}>
                {SIGNS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Person B</label>
              <select className="mt-1 w-full rounded-2xl border border-white/60 bg-white/70 px-3 py-2" value={b} onChange={(e)=>setB(e.target.value)}>
                {SIGNS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Visual */}
          <div className="card grid place-items-center">
            <div
              className="mx-auto w-40 h-40 md:w-56 md:h-56 rounded-full ring-gradient grid place-content-center"
              style={{ ["--p"]: `${percent}%` }}
            >
              <div className="inner w-32 h-32 md:w-44 md:h-44 rounded-full bg-white/80 backdrop-blur grid place-content-center border border-white/60">
                <div className="text-4xl md:text-5xl font-black gradient-text">{score}</div>
                <div className="text-xs text-gray-500">/ 100</div>
              </div>
            </div>
            <p className="mt-4 text-gray-700 text-center">
              (Demo) A bright, playful match with room to grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
