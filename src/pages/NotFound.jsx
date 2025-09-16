import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold gradient-text">404</h1>
      <p className="mt-2 text-gray-700">The stars can’t find this page.</p>
      <Link className="mt-6 inline-flex btn btn-primary" to="/">Go Home</Link>
    </section>
  );
}
