import STREAKS from "./streaks";
import { getDailyPuzzle, getPuzzleNumber } from "./daily";

export { getDailyPuzzle, getPuzzleNumber };
export default STREAKS;

export function getPuzzleByIndex(index) {
  const dayOffset = Math.floor((new Date() - new Date(2026, 0, 1)) / 86400000);
  const i = ((dayOffset + index) % STREAKS.length + STREAKS.length) % STREAKS.length;
  return STREAKS[i];
}
