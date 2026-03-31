import { createCache } from "./apiCache";

const cache = createCache();

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export function initializeCache(puzzles) {
  puzzles.forEach((p) => cache.set(p.answer.toLowerCase(), true));
}

export async function isWord(w) {
  const lower = w.toLowerCase();
  if (cache.has(lower)) return cache.get(lower);

  try {
    const res = await fetch(
      `${API_URL}/${encodeURIComponent(lower)}`
    );
    const valid = res.ok;
    cache.set(lower, valid);
    return valid;
  } catch {
    // Network error — accept the word rather than blocking gameplay
    return true;
  }
}
