import { createCache } from "./apiCache";

const cache = createCache({
  ttl: 24 * 60 * 60 * 1000, // 24 hours
  persistKey: "semantics-definitions",
});

const WIKTIONARY_URL = "https://en.wiktionary.org/api/rest_v1/page/definition";

const ARCHAIC_LABELS = ["archaic", "obsolete", "dated", "historical", "now rare", "rare"];

function parseDefinitionHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  // Look for qualifier labels (archaic, obsolete, etc.)
  const qualifierEls = doc.querySelectorAll(
    ".qualifier-content, .usage-label-content, .ib-content"
  );
  const labels = [...qualifierEls]
    .map((el) => el.textContent.trim().toLowerCase())
    .filter((label) => ARCHAIC_LABELS.some((a) => label.includes(a)));

  // Strip HTML to plain text
  const plainText = doc.body.textContent.trim();

  return { labels, plainText };
}

function categorizeDefinition(labels, plainText) {
  if (labels.some((l) => l.includes("obsolete"))) {
    return { category: "obsolete", label: "obsolete", definition: plainText };
  }
  if (labels.some((l) => l.includes("archaic"))) {
    return { category: "archaic", label: "archaic", definition: plainText };
  }
  if (labels.some((l) => l.includes("dated") || l.includes("historical") || l.includes("rare"))) {
    return { category: "archaic", label: labels[0], definition: plainText };
  }
  return { category: "modern", label: null, definition: plainText };
}

export async function fetchDefinitions(word) {
  const lower = word.toLowerCase();

  return cache.getOrFetch(lower, async () => {
    const res = await fetch(`${WIKTIONARY_URL}/${encodeURIComponent(lower)}`);
    if (!res.ok) return { modern: [], archaic: [], obsolete: [] };

    const data = await res.json();
    const result = { modern: [], archaic: [], obsolete: [] };

    // Wiktionary returns definitions grouped by language, then part of speech
    const englishEntries = data.en || [];

    for (const entry of englishEntries) {
      const partOfSpeech = entry.partOfSpeech || "";

      for (const def of entry.definitions || []) {
        const html = def.definition || "";
        if (!html) continue;

        const { labels, plainText } = parseDefinitionHtml(html);
        if (!plainText) continue;

        const { category, label, definition } = categorizeDefinition(labels, plainText);

        const item = { definition, partOfSpeech };
        if (label) item.label = label;

        result[category].push(item);
      }
    }

    return result;
  });
}
