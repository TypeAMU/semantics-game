import STREAKS from "./streaks";

const dayOffset = Math.floor((new Date() - new Date(2026, 0, 1)) / 86400000);

export function getDailyPuzzle() {
  return STREAKS[((dayOffset % STREAKS.length) + STREAKS.length) % STREAKS.length];
}

export function getPuzzleNumber() {
  return dayOffset + 1;
}
