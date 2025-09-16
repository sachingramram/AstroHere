export default function About() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-3xl md:text-4xl font-extrabold gradient-text">About AstroVeda</h1>
      <div className="card p-6 space-y-3">
        <p className="text-gray-700">
          AstroVeda is a modern astrology playground—daily insights, playful compatibility checks,
          and a birth chart demo—built in React + Tailwind v4 with glassmorphism and gradients.
        </p>
        <p className="text-gray-700">
          Extend it with real APIs later, add auth, and store user preferences. The UI is already wired for growth.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="pill">React 18</span>
          <span className="pill">Tailwind v4</span>
          <span className="pill">Glassmorphism</span>
          <span className="pill">Gradients</span>
        </div>
      </div>
    </section>
  );
}
