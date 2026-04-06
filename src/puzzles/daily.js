import STREAKS from "./streaks";

const EPOCH = new Date(2026, 0, 1);
const dayOffset = Math.floor((new Date() - EPOCH) / 86400000);

// Daily overrides: dayNumber → index in STREAKS.
// These puzzles debut as dailies first, then unlock into the streak pool.
const DAILY_OVERRIDES = {
  96: 216,  // Apr 6 — FORTUNE
  97: 217,  // Apr 7 — DESPITE
  98: 218,  // Apr 8 — CONVERSATION
  99: 219,  // Apr 9 — FOREST
  100: 220, // Apr 10 — CONFUSION
};

function getDailyIndex(dayNumber) {
  if (DAILY_OVERRIDES[dayNumber] !== undefined) return DAILY_OVERRIDES[dayNumber];
  return (((dayNumber - 1) % STREAKS.length) + STREAKS.length) % STREAKS.length;
}

export function getDailyPuzzle() {
  return STREAKS[getDailyIndex(dayOffset + 1)];
}

export function getPuzzleNumber() {
  return dayOffset + 1;
}

/**
 * Returns STREAKS indices that are scheduled as future dailies
 * and should be excluded from the streak pool.
 */
export function getLockedDailyIndices() {
  const today = dayOffset + 1;
  const locked = new Set();
  for (const [day, idx] of Object.entries(DAILY_OVERRIDES)) {
    if (Number(day) >= today) locked.add(idx);
  }
  return locked;
}

/**
 * Get the puzzle for a specific day number (1-indexed).
 * Returns null if the day hasn't happened yet.
 */
export function getPuzzleForDay(dayNumber) {
  if (dayNumber < 1 || dayNumber > dayOffset + 1) return null;
  return STREAKS[getDailyIndex(dayNumber)];
}

/**
 * Get all past daily puzzles as an array of { dayNumber, date, puzzle }.
 * Most recent first.
 */
export function getDailyArchive() {
  const today = dayOffset + 1;
  const archive = [];
  for (let d = today; d >= 1; d--) {
    const date = new Date(EPOCH);
    date.setDate(date.getDate() + (d - 1));
    archive.push({
      dayNumber: d,
      date: date.toISOString().slice(0, 10),
      puzzle: STREAKS[getDailyIndex(d)],
    });
  }
  return archive;
}
