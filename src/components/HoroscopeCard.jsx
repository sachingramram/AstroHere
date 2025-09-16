import { Link } from "react-router-dom";

export default function HoroscopeCard({ sign, dateRange, summary }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold capitalize gradient-text">{sign}</h3>
          <p className="text-xs text-gray-600">{dateRange}</p>
        </div>
        <div className="size-12 rounded-2xl grid place-content-center text-white"
             style={{background:'linear-gradient(135deg, rgb(236 72 153), rgb(99 102 241))'}}>
          <span className="text-xl">♟</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-700">{summary}</p>
      <div className="mt-4 flex justify-end">
        <Link className="btn btn-primary" to={`/horoscope/${sign.toLowerCase()}`}>
          Read full →
        </Link>
      </div>
    </div>
  );
}
