# Semantics Game — Agent Handoff Guide

## What this project is

**Semantics** (semantics.fyi) is a daily word puzzle game where players guess a modern English word from its obsolete historical definition. Built with React 18 + Vite, deployed to GitHub Pages.

Example: the clue "Foolish, ignorant, simple-minded" → answer is **NICE** (which meant "foolish" in the 1300s).

## Current state (2026-04-04)

### What's working
- Full game loop: explore (reveal letters) + solve (guess answer), 3 of each = 6 max actions
- Two modes: **Daily** (one per day, deterministic) and **Streak** (random from pool, one loss ends it)
- Timeline hints appear after 3 and 5 actions showing how the word's meaning evolved
- Post-game: etymology from Wiktionary API, modern definition from Free Dictionary API
- Stats in localStorage: streak best, daily completion history, daily consecutive streak
- Best-streak counter shown in streak mode header (small sub-line below live count)
- Deployed to semantics.fyi via GitHub Pages (`.github/workflows/deploy.yml`)

### Puzzle architecture (recently restructured)
The puzzle system uses a **streaks/daily/incoming** pattern:

```
src/puzzles/
  streaks.js      — Master pool: ALL 31 approved puzzles, answers base64-obfuscated
  daily.js        — Deterministic daily pick from streaks (dayOffset from Jan 1, 2026)
  incoming.js     — Staging area for new puzzles from data pipeline (currently empty)
  index.js        — Public API re-exports (getDailyPuzzle, getPuzzleNumber, default=STREAKS)
  obfuscate.js    — encode()/decode() wrappers around btoa/atob
```

**Puzzle promotion flow:**
```
semantics-data/output/candidates.json  →  incoming.js  →  streaks.js  →  daily.js picks from it
```

- `streaks.js` is the single source of truth. Both streak and daily modes draw from it.
- Answers are base64-encoded in source: `decode("TklDRQ==")` not `"NICE"`. Not real security — just prevents casual source-reading spoilers. Confirmed: no plaintext answers in production bundle.
- To add new puzzles: format them into `incoming.js`, review, then move to `streaks.js` with base64'd answers.

### Puzzle schema
```js
{
  answer: decode("TklDRQ=="),  // "NICE" — base64 obfuscated
  clue: "Foolish, ignorant, simple-minded",
  hints: [
    { era: "1400s", def: "Fussy, fastidious about small details" },
    { era: "1700s", def: "Kind, thoughtful, well-mannered" },
  ],
}
```

### What's NOT done yet
- Only **31 puzzles** in the pool. Need ~300+ for sustainable daily play. The data pipeline (`../semantics-data/`) has 1,097 raw candidates but Phase 2 (Etymonline enrichment for era/timeline data) and Phase 3 (quality curation) haven't been done yet.
- No backend — everything is client-side. Plan exists for Cloudflare Workers + R2 when ready to scale (server-side guess checking, per-puzzle API, answer hiding). For now the local file structure is designed to port cleanly to that.
- No user accounts or server-side stats. Stats are localStorage only.

## Project layout

```
semantics-game/
  CNAME                           # semantics.fyi
  vite.config.js                  # Vite 5, React plugin, base: '/'
  package.json                    # React 18, no other runtime deps
  .github/workflows/deploy.yml    # GitHub Pages deploy on push to main
  src/
    main.jsx                      # React entry point
    index.css                     # Global styles
    App.jsx                       # Menu screen (Daily / Streak / How to Play)
    Semantics.jsx                 # Core game engine (~720 lines)
    HowToPlay.jsx                 # Rules/tutorial page
    puzzles/
      streaks.js                  # Master puzzle pool (31 puzzles, base64 answers)
      daily.js                    # Daily puzzle selection logic
      incoming.js                 # Pipeline staging area (empty)
      index.js                    # Public API for game engine
      obfuscate.js                # base64 encode/decode
    services/
      wordValidation.js           # Free Dictionary API for guess validation
      definitionsApi.js            # Wiktionary REST API for post-game etymology display
      apiCache.js                 # Generic cache with TTL + localStorage persistence
      gameStats.js                # localStorage stats (streakBest, dailyCompleted, etc.)
    tools/
      PuzzleResearcher.jsx        # Dev tool: search Wiktionary for puzzle candidates
  dist/                           # Production build output
```

## Game mechanics

- **Explore** (3 uses): Enter any valid word (up to answer length). Letters in your word that also appear in the answer glow green. Others go grey.
- **Solve** (3 uses): Guess the answer. Wrong = 1 new green + 1 new grey revealed. Right = win.
- Both modes can win (typing exact answer in explore also wins).
- Timeline hints at 3 and 5 total actions.
- Word validation via `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`. Network errors accept the word (graceful fallback). Puzzle answers are pre-seeded as valid in the cache.

## Commands

```bash
npm install          # Install deps
npm run dev          # Dev server at localhost:5173
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

## Key patterns

- **No CSS framework**: All styling is inline JS objects (the `S` const at bottom of each component). Warm dark parchment aesthetic: dark browns (#1c1914), golds (#b88e4a), sepia text (#ddd0b8). Fonts: Cormorant Garamond (headings) + Lora (body).
- **Responsive**: CSS media queries in `<style>` tags for 768px and 1200px breakpoints. Desktop gets larger fonts, keys, and containers.
- **API caching**: `apiCache.js` provides a `createCache({ ttl, persistKey })` factory. Deduplicates in-flight requests. Word validation cache is in-memory only; definitions cache persists to localStorage with 24h TTL.
- **Daily puzzle determinism**: `dayOffset = Math.floor((new Date() - new Date(2026, 0, 1)) / 86400000)`. Puzzle = `STREAKS[dayOffset % STREAKS.length]`. Same puzzle for all users on same day.
- **Streak randomization**: Fisher-Yates shuffle of indices on component mount. Wraps around if streak exceeds pool size.

## Related project

The data pipeline at `../semantics-data/` (or `/home/ahmad/projects/semantics-data/`) generates puzzle candidates. See its own CLAUDE.md for pipeline details. Key state:
- Phase 1 (Wiktionary scrape): 1,097 candidates in `output/candidates.json`
- Phase 2 (Etymonline enrichment): NOT STARTED
- Phase 3 (Quality curation): NOT STARTED

## Important notes

- The `initializeCache(PUZZLES)` call in `Semantics.jsx:8` pre-seeds all puzzle answers as valid in the dictionary cache. This means answers are in memory at runtime — acceptable for now, but would need to change if moving to server-side checking.
- The game repo is `https://github.com/TypeAMU/semantics-game.git`.
- GitHub Actions workflow deploys to GitHub Pages automatically on push to main.
- Don't add puzzles directly to `streaks.js` without base64-encoding the answer. Use `btoa("WORD")` to get the encoded string, then `decode("...")` in the file.
