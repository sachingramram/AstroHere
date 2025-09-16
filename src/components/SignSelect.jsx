import { ZODIAC } from "../data/zodiac.js";

export default function SignSelect({ value, onChange }) {
  return (
    <select
      className="w-full rounded-2xl border border-white/60 bg-white/70 backdrop-blur px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select your sign</option>
      {ZODIAC.map((z) => (
        <option key={z.key} value={z.key}>
          {z.name}
        </option>
      ))}
    </select>
  );
}
