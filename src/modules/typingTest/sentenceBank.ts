const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing accurately is more important than typing fast.",
  "Practice makes perfect in the world of typing.",
  "Every mistake is an opportunity to learn and improve.",
  "Stay relaxed and focus on steady finger movement."
];

export function getRandomSentence(): string {
  const index = Math.floor(Math.random() * sentences.length);
  return sentences[index];
}
