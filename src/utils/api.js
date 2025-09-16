const TEMPLATES = [
  "A calm shift helps you focus on what truly matters. Small wins stack today.",
  "Someone’s kind words spark momentum. Share your ideas bravely.",
  "Clear boundaries unlock your energy. Say no to noise, yes to purpose.",
  "Money/Work: a practical tweak pays off. Health: hydrate + short walk.",
  "Love favors sincerity—simple truths over grand gestures.",
  "Learning vibes are strong: note, iterate, repeat. Trust your pace."
];

export function getDailyHoroscope(signKey) {
  // Simple deterministic mock by sign name
  const seed = Array.from(signKey).reduce((a, c) => a + c.charCodeAt(0), 0);
  const pick = (i) => TEMPLATES[(seed + i) % TEMPLATES.length];

  return {
    sign: signKey,
    date: new Date().toDateString(),
    sections: [
      { title: "Overview", text: pick(0) },
      { title: "Love", text: pick(1) },
      { title: "Career", text: pick(2) },
      { title: "Money", text: pick(3) },
      { title: "Health", text: pick(4) },
      { title: "Learning", text: pick(5) }
    ],
    luckyColor: ["Rose", "Indigo", "Emerald", "Gold"][(seed % 4)],
    luckyNumber: (seed % 9) + 1
  };
}

export function getCompatibilityScore(a, b) {
  if (!a || !b) return 0;
  const score = (a.length * 17 + b.length * 11) % 101;
  return score; // 0–100 mock score
}
