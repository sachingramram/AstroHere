// src/pages/GeminiChat.jsx
import { useEffect, useRef, useState } from "react";
import { streamChat } from "../ai/gemini.js";

const systemPrompt = `You are AstroVeda's helpful AI. Tone: friendly, concise.
Capabilities:
- Give daily horoscope–style guidance for any of the 12 zodiac signs.
- Explain compatibility between two signs clearly.
- Explain (demo) birth-chart concepts without making medical/financial claims.
If asked to predict exact outcomes, keep guidance general and positive.`;

export default function GeminiChat() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  // UI chat history (role: "user" | "model")
  const [messages, setMessages] = useState([
    { role: "model", content: "Namaste! I'm Gemini AI inside AstroVeda. Ask me about your sign ✨" },
  ]);

  const viewportRef = useRef(null);
  const scrollToBottom = () => {
    const el = viewportRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, busy]);

  async function onSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    const userMsg = { role: "user", content: text };
    const withUser = [...messages, userMsg];

    // Add a placeholder for the streaming model reply
    const replyIndex = withUser.length;
    setMessages([...withUser, { role: "model", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      let acc = "";
      // Pass system prompt via options; do NOT include it in the messages array
      for await (const chunk of streamChat(withUser, { system: systemPrompt })) {
        acc += chunk;
        setMessages((prev) => {
          const copy = [...prev];
          copy[replyIndex] = { role: "model", content: acc };
          return copy;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "⚠️ Error talking to Gemini. Check your API key and try again." },
      ]);
    } finally {
      setBusy(false);
      scrollToBottom();
    }
  }

  const quickies = [
    "Daily horoscope for Leo",
    "Compatibility: Aries and Cancer",
    "Explain Moon sign vs Sun sign",
    "Give a mindful affirmation for today",
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold gradient-text">AI Chat (Gemini)</h1>
      <p className="mt-2 text-gray-700">
        Ask anything about zodiac, compatibility, or birth-chart basics.
      </p>

      {/* Quick prompts */}
      <div className="mt-4 flex flex-wrap gap-2">
        {quickies.map((q) => (
          <button key={q} className="pill hover:opacity-90" onClick={() => setInput(q)}>
            {q}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div ref={viewportRef} className="card mt-6 p-4 h-[60vh] overflow-y-auto scroll-smooth">
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 border ${
                  m.role === "user"
                    ? "bg-white/80 backdrop-blur border-white/60"
                    : "bg-white/70 backdrop-blur border-white/50"
                }`}
              >
                <div className="text-xs mb-1 opacity-60">
                  {m.role === "user" ? "You" : "Gemini"}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
              </div>
            </div>
          ))}

          {busy && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl px-4 py-3 border bg-white/70 backdrop-blur border-white/50">
                <div className="text-xs mb-1 opacity-60">Gemini</div>
                <div className="animate-pulse">Thinking…</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <form onSubmit={onSend} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-2xl border border-white/60 bg-white/70 backdrop-blur px-3 py-3"
          placeholder="Ask about your sign, compatibility…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary min-w-24 disabled:opacity-60"
          disabled={busy || !input.trim()}
        >
          {busy ? "Sending…" : "Send"}
        </button>
      </form>

      <p className="mt-3 text-xs opacity-70">
        Demo only. For production, route API calls via a backend to keep your key safe.
      </p>
    </section>
  );
}
