import PUZZLES from "./puzzleData";

export function getDailyPuzzle() {
  const d = Math.floor((new Date() - new Date(2026, 0, 1)) / 86400000);
  return PUZZLES[((d % PUZZLES.length) + PUZZLES.length) % PUZZLES.length];
}

export function getPuzzleNumber() {
  return Math.floor((new Date() - new Date(2026, 0, 1)) / 86400000) + 1;
}

export default PUZZLES;
