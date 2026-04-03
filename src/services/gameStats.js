const STORAGE_KEY = "semantics-stats";

const DEFAULTS = {
  streakBest: 0,
  streakGamesPlayed: 0,
  streakGamesWon: 0,
  dailyCompleted: {},
  dailyCurrentStreak: 0,
  dailyBestStreak: 0,
  dailyLastCompletedDay: null,
};

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

function write(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // storage unavailable — silent fallback
  }
}

export function getStats() {
  return read();
}

export function recordStreakResult(streakCount) {
  const stats = read();
  stats.streakGamesPlayed += streakCount + 1; // all wins + the final loss
  stats.streakGamesWon += streakCount;
  if (streakCount > stats.streakBest) {
    stats.streakBest = streakCount;
  }
  write(stats);
  return stats;
}

export function recordDailyResult({ dayNumber, won, guesses }) {
  const stats = read();

  // Don't overwrite an existing result for this day
  if (stats.dailyCompleted[dayNumber]) return stats;

  stats.dailyCompleted[dayNumber] = {
    won,
    guesses,
    date: new Date().toISOString().slice(0, 10),
  };

  // Update daily consecutive streak
  if (won) {
    if (stats.dailyLastCompletedDay === dayNumber - 1) {
      stats.dailyCurrentStreak += 1;
    } else {
      stats.dailyCurrentStreak = 1;
    }
    stats.dailyLastCompletedDay = dayNumber;
    if (stats.dailyCurrentStreak > stats.dailyBestStreak) {
      stats.dailyBestStreak = stats.dailyCurrentStreak;
    }
  } else {
    stats.dailyCurrentStreak = 0;
  }

  write(stats);
  return stats;
}

export function getDailyResult(dayNumber) {
  const stats = read();
  return stats.dailyCompleted[dayNumber] || null;
}

export function resetStats() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silent
  }
}
