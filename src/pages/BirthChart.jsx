// src/pages/BirthChart.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { streamChat } from "../ai/gemini.js";

/* ---------- Modern, colorful system prompt (see section 1 above) ---------- */
const systemPrompt = `
You are AstroVeda’s astrologer writing in a **modern, colorful** style.
Return a clear, uplifting **Markdown** “Birth Chart — Neon Preview” using short sections and tasteful emojis (one per section).
No medical/financial/legal claims. No exact planetary degrees/houses. If any detail is unknown, write “not calculated in this demo”.

FORMAT (Markdown only, no code fences):

# Birth Chart — Neon Preview

**Profile**  
**Name**: <name> • **DOB**: <date> • **Time**: <time> • **Place**: <place> • **Sun Sign**: <sun or "not calculated">

---

## ✨ Snapshot
1–2 lines capturing the overall vibe.

## ☀️ Sun • 🌙 Moon • ⬆️ Rising
- **Sun**: <sun or "not calculated">
- **Moon**: not calculated in this demo
- **Rising**: not calculated in this demo

## 🎨 Personality Themes
- **Trait** — one short, friendly line.
- **Trait** — one short, friendly line.
- **Trait** — one short, friendly line.
- **Trait** — one short, friendly line.

## 🔭 Life Areas
### ❤️ Love
One concise supportive line.
### 💼 Career
One concise practical line.
### 🧘 Wellbeing
One concise balanced line.

## 🍀 Lucky Vibes
- **Color**: a simple color
- **Number**: 1–9
- **Day**: Mon/Tue/Wed/Thu/Fri/Sat/Sun

## 📝 Affirmations
- "I …"
- "I …"
- "I …"

---
*Friendly AI preview for learning/entertainment; precise charts require ephemeris-based calculation.*
`;

/* ---------- Helper: quick Sun sign by date (approximate) ---------- */
function getSunSignByDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d)) return null;
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const inRange = (m1, d1, m2, d2) =>
    (m > m1 || (m === m1 && day >= d1)) && (m < m2 || (m === m2 && day <= d2));
  if (inRange(3,21,4,19)) return "Aries";
  if (inRange(4,20,5,20)) return "Taurus";
  if (inRange(5,21,6,20)) return "Gemini";
  if (inRange(6,21,7,22)) return "Cancer";
  if (inRange(7,23,8,22)) return "Leo";
  if (inRange(8,23,9,22)) return "Virgo";
  if (inRange(9,23,10,22)) return "Libra";
  if (inRange(10,23,11,21)) return "Scorpio";
  if (inRange(11,22,12,21)) return "Sagittarius";
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return "Capricorn";
  if (inRange(1,20,2,18)) return "Aquarius";
  if (inRange(2,19,3,20)) return "Pisces";
  return null;
}

export default function BirthChart() {
  const [form, setForm] = useState({ name: "", date: "", time: "", place: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");

  const sun = useMemo(() => getSunSignByDate(form.date), [form.date]);

  const viewportRef = useRef(null);
  const scrollToBottom = () =>
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" });
  useEffect(scrollToBottom, [output, busy]);

  const handle = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setOutput("");

    if (!form.name || !form.date || !form.time || !form.place) {
      setError("Please fill all fields (Name, Date, Time, Place).");
      return;
    }

    const KEY_PRESENT = !!import.meta.env.VITE_GEMINI_API_KEY?.trim();
    if (!KEY_PRESENT) {
      setError("Missing VITE_GEMINI_API_KEY. Add it to your .env and restart the dev server.");
      return;
    }

    const userPrompt = [
      `Create the Neon Preview using these details:`,
      `Name: ${form.name}`,
      `DOB (YYYY-MM-DD): ${form.date}`,
      `Time (HH:MM): ${form.time}`,
      `Place: ${form.place}`,
      `Sun Sign (by date if provided): ${sun || "not calculated"}`,
    ].join("\n");

    setBusy(true);
    try {
      let acc = "";
      for await (const chunk of streamChat([{ role: "user", content: userPrompt }], { system: systemPrompt })) {
        acc += chunk;
        setOutput(acc);
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Error generating preview via Gemini. Check your API key / network and try again.");
    } finally {
      setBusy(false);
      scrollToBottom();
    }
  }

  /* ---------- Markdown theming: map tags to our glossy styles ---------- */
  const md = {
    h1: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-black gradient-text">{children}</h2>
    ),
    h2: ({ children }) => (
      <h3 className="mt-8 text-xl md:text-2xl font-bold gradient-text">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-4 text-base md:text-lg font-semibold text-gray-900/90 dark:text-gray-100">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-200">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="mt-3 space-y-2">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="relative pl-6 text-gray-700 dark:text-gray-200 before:content-['✦'] before:absolute before:left-0 before:top-1 before:text-rose-500">
        {children}
      </li>
    ),
    hr: () => (
      <div className="my-6 h-px w-full rounded bg-gradient-to-r from-pink-500 via-indigo-500 to-emerald-500 opacity-50" />
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-4 pl-4 border-rose-400/60 text-gray-700 dark:text-gray-200">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded-md bg-white/70 dark:bg-black/30 border border-white/50 dark:border-white/10 px-1.5 py-0.5">
        {children}
      </code>
    ),
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-3xl md:text-4xl font-extrabold gradient-text">Birth Chart (AI Preview)</h1>

        <button
          type="button"
          className="pill hover:opacity-90"
          onClick={() => navigator.clipboard.writeText(output || "")}
          disabled={!output}
          title="Copy preview"
        >
          Copy Preview
        </button>
      </div>

      <p className="mt-2 text-gray-700">
        Enter your details and get a friendly, colorful AI-generated birth chart <em>preview</em>.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 card p-6 grid gap-4">
        <input
          className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur px-3 py-2"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => handle("name", e.target.value)}
          required
        />
        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="date"
            className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur px-3 py-2"
            value={form.date}
            onChange={(e) => handle("date", e.target.value)}
            required
          />
          <input
            type="time"
            className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur px-3 py-2"
            value={form.time}
            onChange={(e) => handle("time", e.target.value)}
            required
          />
        </div>
        <input
          className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur px-3 py-2"
          placeholder="Birth Place (City, Country)"
          value={form.place}
          onChange={(e) => handle("place", e.target.value)}
          required
        />

        <div className="flex flex-wrap items-center gap-2">
          <button type="submit" className="btn btn-primary disabled:opacity-60" disabled={busy}>
            {busy ? "Generating…" : "Generate Preview"}
          </button>

          {/* Chips mirroring the theme */}
          {form.name && <span className="pill">👤 {form.name}</span>}
          {form.date && <span className="pill">📅 {form.date}</span>}
          {form.time && <span className="pill">⏰ {form.time}</span>}
          {form.place && <span className="pill">📍 {form.place}</span>}
          {sun && <span className="pill">☀️ {sun}</span>}
        </div>

        {error && (
          <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </form>

      {/* Result */}
      <div ref={viewportRef} className="relative card mt-6 p-6 min-h-[220px] overflow-hidden">
        {/* gradient edge accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-emerald-500 opacity-60" />
        {!output && !busy && (
          <p className="text-sm text-gray-600">
            Your neon-styled preview will appear here after you click <b>Generate Preview</b>.
          </p>
        )}
        {busy && <div className="animate-pulse text-sm text-gray-600">Talking to the stars… ✨</div>}

        {output && (
          <article className="mt-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
              {output}
            </ReactMarkdown>
          </article>
        )}
      </div>

      <p className="mt-3 text-xs opacity-70">
        Note: AI preview for learning/entertainment. For precise charts, use an ephemeris-backed service.
      </p>
    </section>
  );
}
