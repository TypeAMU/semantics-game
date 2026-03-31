import PUZZLES from "./puzzleData";

const dayOffset = Math.floor((new Date() - new Date(2026, 0, 1)) / 86400000);

export function getPuzzleByIndex(index) {
  const i = ((dayOffset + index) % PUZZLES.length + PUZZLES.length) % PUZZLES.length;
  return PUZZLES[i];
}

export function getDailyPuzzle() {
  return getPuzzleByIndex(0);
}

export function getPuzzleNumber() {
  return dayOffset + 1;
}

export default PUZZLES;
