import { useState } from "react";
import { fetchDefinitions } from "../services/definitionsApi";

export default function PuzzleResearcher() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await fetchDefinitions(word.trim());
      setResult(data);
    } catch (e) {
      setError(e.message || "Failed to fetch definitions");
    } finally {
      setLoading(false);
    }
  };

  const puzzleJson = result
    ? JSON.stringify(
        {
          answer: word.trim().toUpperCase(),
          clue: "// pick the best obsolete definition",
          hints: [
            { era: "????s", def: "// intermediate meaning" },
            { era: "????s", def: "// later meaning" },
          ],
        },
        null,
        2
      )
    : "";

  return (
    <div style={S.container}>
      <h2 style={S.title}>Puzzle Researcher</h2>
      <p style={S.subtitle}>
        Search Wiktionary for archaic/obsolete definitions to help author new
        puzzles.
      </p>

      <div style={S.searchRow}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Enter a word..."
          style={S.input}
        />
        <button onClick={search} disabled={loading} style={S.searchBtn}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div style={S.error}>{error}</div>}

      {result && (
        <div style={S.results}>
          <Section
            title="Obsolete Definitions"
            items={result.obsolete}
            color="#c87a6a"
          />
          <Section
            title="Archaic / Dated"
            items={result.archaic}
            color="#b88e4a"
          />
          <Section
            title="Modern Definitions"
            items={result.modern}
            color="#a8d898"
          />

          {(result.obsolete.length > 0 || result.archaic.length > 0) && (
            <div style={S.templateSection}>
              <h4 style={S.sectionTitle}>Puzzle Template</h4>
              <pre style={S.codeBlock}>{puzzleJson}</pre>
            </div>
          )}

          {result.obsolete.length === 0 && result.archaic.length === 0 && (
            <div style={S.noResults}>
              No archaic or obsolete definitions found for "{word}".
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, items, color }) {
  if (items.length === 0) return null;
  return (
    <div style={S.section}>
      <h4 style={{ ...S.sectionTitle, color }}>{title} ({items.length})</h4>
      {items.map((item, i) => (
        <div key={i} style={S.defItem}>
          <span style={S.partOfSpeech}>{item.partOfSpeech}</span>
          {item.label && (
            <span style={{ ...S.label, color }}>[{item.label}]</span>
          )}
          <span style={S.definition}>{item.definition}</span>
        </div>
      ))}
    </div>
  );
}

const S = {
  container: {
    maxWidth: 700,
    margin: "0 auto",
    padding: 24,
    fontFamily: "'Lora', Georgia, serif",
    color: "#ddd0b8",
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 26,
    fontWeight: 700,
    color: "#e8d8b4",
    margin: "0 0 4px",
  },
  subtitle: {
    fontSize: 13,
    color: "#8a7d60",
    margin: "0 0 20px",
  },
  searchRow: {
    display: "flex",
    gap: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid rgba(184,142,74,.25)",
    background: "rgba(232,216,180,.04)",
    color: "#e0d4be",
    fontSize: 15,
    fontFamily: "'Lora', serif",
    outline: "none",
  },
  searchBtn: {
    padding: "10px 20px",
    borderRadius: 8,
    border: "1px solid rgba(184,142,74,.3)",
    background: "rgba(184,142,74,.15)",
    color: "#cbb87a",
    fontSize: 14,
    fontFamily: "'Lora', serif",
    fontWeight: 600,
    cursor: "pointer",
  },
  error: {
    color: "#c87a6a",
    fontSize: 13,
    marginBottom: 12,
  },
  results: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  section: {
    background: "rgba(232,216,180,.025)",
    border: "1px solid rgba(184,142,74,.1)",
    borderRadius: 10,
    padding: "12px 16px",
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: ".06em",
    margin: "0 0 8px",
  },
  defItem: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    padding: "4px 0",
    borderBottom: "1px solid rgba(184,142,74,.06)",
  },
  partOfSpeech: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 11,
    fontStyle: "italic",
    color: "#6a6050",
    flexShrink: 0,
  },
  label: {
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "'Cormorant Garamond', serif",
    flexShrink: 0,
  },
  definition: {
    fontSize: 13,
    color: "#c8bca0",
    lineHeight: 1.4,
  },
  noResults: {
    fontSize: 14,
    color: "#8a7d60",
    fontStyle: "italic",
    textAlign: "center",
    padding: 20,
  },
  templateSection: {
    background: "rgba(106,158,90,.05)",
    border: "1px solid rgba(106,158,90,.15)",
    borderRadius: 10,
    padding: "12px 16px",
  },
  codeBlock: {
    background: "rgba(0,0,0,.2)",
    borderRadius: 6,
    padding: 12,
    fontSize: 12,
    fontFamily: "monospace",
    color: "#a8d898",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
  },
};
