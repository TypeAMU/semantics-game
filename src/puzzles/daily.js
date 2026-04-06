import STREAKS from "./streaks";

const EPOCH = new Date(2026, 0, 1);
const dayOffset = Math.floor((new Date() - EPOCH) / 86400000);

export function getDailyPuzzle() {
  return STREAKS[((dayOffset % STREAKS.length) + STREAKS.length) % STREAKS.length];
}

export function getPuzzleNumber() {
  return dayOffset + 1;
}

/**
 * Get the puzzle for a specific day number (1-indexed).
 * Returns null if the day hasn't happened yet.
 */
export function getPuzzleForDay(dayNumber) {
  if (dayNumber < 1 || dayNumber > dayOffset + 1) return null;
  const idx = (((dayNumber - 1) % STREAKS.length) + STREAKS.length) % STREAKS.length;
  return STREAKS[idx];
}

/**
 * Get all past daily puzzles as an array of { dayNumber, date, puzzle }.
 * Most recent first.
 */
export function getDailyArchive() {
  const today = dayOffset + 1;
  const archive = [];
  for (let d = today; d >= 1; d--) {
    const idx = (((d - 1) % STREAKS.length) + STREAKS.length) % STREAKS.length;
    const date = new Date(EPOCH);
    date.setDate(date.getDate() + (d - 1));
    archive.push({
      dayNumber: d,
      date: date.toISOString().slice(0, 10),
      puzzle: STREAKS[idx],
    });
  }
  return archive;
}
