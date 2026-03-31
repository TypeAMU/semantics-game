# Σ Semantics

A daily word puzzle where players guess a modern English word from its obsolete historical definition.

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Project Structure

```
src/
  App.jsx          — App wrapper
  Semantics.jsx    — Main game component
  puzzles.js       — Puzzle definitions (answer, clue, hints)
  dictionary.js    — 11K word validation dictionary
  index.css        — Global styles
  main.jsx         — React entry point
```

## Game Mechanics

**Explore** (3 uses) — Type a word, all its letters are checked against the answer. Found letters glow green on the keyboard and float into the assembling word display. Letter cap grows each explore: `ceil(n/2)` → `ceil(n/1.5)` → `n` (min 5).

**Solve** (3 uses) — Attempt the full answer at any length. If wrong, only 1 new green + 1 new grey letter is revealed. If correct, you win.

Both actions can solve the puzzle. Timeline hints appear after 3 and 5 total actions.

## Adding Puzzles

Edit `src/puzzles.js`. Each puzzle needs:

```js
{
  answer: "WORD",
  clue: "The obsolete definition shown to the player",
  hints: [
    { era: "1400s", def: "Intermediate historical meaning" },
    { era: "1700s", def: "Later historical meaning" },
  ],
}
```

## Dictionary

The dictionary in `src/dictionary.js` contains ~11K common English words. For production, replace with an API call to a full dictionary service.

Puzzle answers are automatically added to the dictionary at runtime.

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy anywhere that serves static files.
