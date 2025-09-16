// src/ai/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

// Create a model instance; optionally apply a system instruction
function makeModel(system) {
  if (!API_KEY) throw new Error("Missing VITE_GEMINI_API_KEY");
  const genAI = new GoogleGenerativeAI(API_KEY);
  return genAI.getGenerativeModel(
    system
      ? { model: MODEL_NAME, systemInstruction: system }
      : { model: MODEL_NAME }
  );
}

export async function generateOnce(prompt, { system } = {}) {
  const model = makeModel(system);
  const res = await model.generateContent(prompt);
  return res.response.text();
}

// messages: [{ role: "user"|"assistant", content: string }, ...]
// NOTE: We will drop any leading non-user items from history.
export async function* streamChat(messages, { system } = {}) {
  if (!messages?.length) return;

  // last message is the one we send now (must be user)
  const last = messages[messages.length - 1];

  // Build valid history: must start with a user; drop leading assistant-only items
  const history = [];
  for (let i = 0; i < messages.length - 1; i++) {
    const m = messages[i];
    if (!m?.content?.trim()) continue;
    if (history.length === 0 && m.role !== "user") continue; // drop leading non-user
    history.push({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    });
  }

  const chat = makeModel(system).startChat({ history });
  const stream = await chat.sendMessageStream(last.content);

  for await (const evt of stream.stream) {
    const chunk = await evt.text();
    if (chunk) yield chunk;
  }
}
