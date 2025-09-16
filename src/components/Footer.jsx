// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { useMemo } from "react";

function ExternalIcon({ label, href, children }) {
  return (
    <a
      aria-label={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/70 px-3 py-2 hover:bg-white/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t border-white/50 bg-white/70 backdrop-blur">
      {/* Top grid */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="inline-grid size-9 place-items-center rounded-2xl text-white font-black"
                style={{ background: "linear-gradient(135deg, rgb(236 72 153), rgb(99 102 241))" }}
              >
                ✦
              </span>
              <span className="text-lg font-bold gradient-text">AstroVeda</span>
            </div>
            <p className="mt-3 text-sm text-gray-700">
              Colorful, modern astrology for everyone — horoscopes, compatibility, and an AI birth-chart preview.
            </p>

            {/* Social row */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <ExternalIcon label="Instagram" href="https://instagram.com/">
                {/* Instagram glyph */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM18.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </ExternalIcon>
              <ExternalIcon label="X" href="https://x.com/">
                {/* X glyph */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                  <path d="M18.244 2H21l-6.5 7.43L22 22h-6.756l-4.88-6.05L4.8 22H2l6.97-7.97L2 2h6.756l4.52 5.6L18.244 2Zm-2.24 18h1.24L7.17 4H5.93l10.074 16Z" />
                </svg>
              </ExternalIcon>
              <ExternalIcon label="GitHub" href="https://github.com/">
                {/* GitHub glyph */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                  <path fillRule="evenodd" d="M12 2a10 10 0 0 0-3.162 19.49c.5.093.683-.217.683-.483 0-.237-.01-1.023-.015-1.855-2.78.604-3.366-1.188-3.366-1.188-.455-1.157-1.111-1.466-1.111-1.466-.908-.62.07-.607.07-.607 1.003.07 1.53 1.03 1.53 1.03.892 1.528 2.342 1.087 2.912.832.09-.647.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.985 1.03-2.686-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.026A9.58 9.58 0 0 1 12 6.845c.85.004 1.705.115 2.504.338 1.91-1.295 2.748-1.026 2.748-1.026.547 1.376.203 2.393.1 2.646.64.701 1.028 1.595 1.028 2.686 0 3.842-2.339 4.688-4.566 4.936.359.31.678.919.678 1.852 0 1.336-.012 2.414-.012 2.744 0 .268.18.58.688.481A10.001 10.001 0 0 0 12 2Z" clipRule="evenodd"/>
                </svg>
              </ExternalIcon>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="hover:underline" to="/">Home</Link></li>
              <li><Link className="hover:underline" to="/horoscope">Horoscope</Link></li>
              <li><Link className="hover:underline" to="/compatibility">Compatibility</Link></li>
              <li><Link className="hover:underline" to="/birth-chart">Birth Chart</Link></li>
              <li><Link className="hover:underline" to="/ai">AI Chat</Link></li>
              <li><Link className="hover:underline" to="/about">About</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:underline" href="#guide">Beginner’s Guide</a></li>
              <li><a className="hover:underline" href="#faq">FAQ</a></li>
              <li><a className="hover:underline" href="#support">Support</a></li>
              <li><a className="hover:underline" href="#press">Press Kit</a></li>
            </ul>
          </div>

          {/* Newsletter (non-blocking on mobile) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600">Newsletter</h3>
            <p className="mt-3 text-sm text-gray-700">
              Sign up for weekly cosmic tips & updates.
            </p>
            <form
              className="mt-3 flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed! (Demo)");
              }}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 rounded-2xl border border-white/60 bg-white/70 px-3 py-2 min-h-[44px]"
              />
              <button type="submit" className="btn btn-primary min-h-[44px]">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-600">© {year} AstroVeda. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <a className="hover:underline" href="#privacy">Privacy</a>
            <span className="opacity-40">•</span>
            <a className="hover:underline" href="#terms">Terms</a>
            <span className="opacity-40">•</span>
            <a className="hover:underline" href="#cookies">Cookies</a>
          </div>
        </div>
        {/* iOS safe-area breathing room */}
        <div className="pb-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </footer>
  );
}
