import { Link } from "react-router-dom";
import { ZODIAC } from "../data/zodiac.js";

export default function ZodiacGrid() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {ZODIAC.map((z) => (
        <Link
          key={z.key}
          to={`/horoscope/${z.key}`}
          className="card p-5 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{z.name}</h3>
              <p className="text-xs text-gray-600">{z.range}</p>
            </div>
            <div className="size-12 rounded-2xl grid place-content-center text-white transition"
                 style={{background:'linear-gradient(135deg, rgb(16 185 129), rgb(99 102 241))'}}>
              <span className="text-xl group-hover:scale-110 transition">{z.emoji}</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-700">{z.trait}</p>
        </Link>
      ))}
    </div>
  );
}
