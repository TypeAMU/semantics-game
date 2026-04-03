import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import PUZZLES, { getPuzzleByIndex, getDailyPuzzle, getPuzzleNumber } from "./puzzles";
import { isWord, initializeCache } from "./services/wordValidation";
import { fetchDefinitions } from "./services/definitionsApi";
import { getStats, recordStreakResult, recordDailyResult, getDailyResult } from "./services/gameStats";

initializeCache(PUZZLES);

// --- Game config ---
const MAX_EXPLORES = 3;
const MAX_SOLVES = 3;
const KB_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

function getVisibleWord(answer, keyStates) {
  const found = new Set(
    Object.entries(keyStates)
      .filter(([, v]) => v === "found")
      .map(([k]) => k)
  );
  return [...answer].map((ch) => ({ ch, found: found.has(ch) }));
}

function getRandomIndices(count) {
  const indices = Array.from({ length: PUZZLES.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

export default function Semantics({ mode = "streak", onBack }) {
  const [streakOrder] = useState(() => getRandomIndices(PUZZLES.length));
  const [streakIndex, setStreakIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [streakOver, setStreakOver] = useState(false);
  const [streakBest, setStreakBest] = useState(() => getStats().streakBest);

  const dayNumber = getPuzzleNumber();
  const [dailyAlreadyDone] = useState(() => mode === "daily" ? getDailyResult(dayNumber) : null);

  const puzzle = mode === "daily"
    ? getDailyPuzzle()
    : PUZZLES[streakOrder[streakIndex % streakOrder.length]];
  const answer = puzzle.answer.toUpperCase();
  const answerSet = useMemo(() => new Set([...answer]), [answer]);

  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [shake, setShake] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const [checking, setChecking] = useState(false);
  const [etymology, setEtymology] = useState(null);
  const [modernDef, setModernDef] = useState("");
  const listEndRef = useRef(null);

  useEffect(() => {
    if (gameState !== "playing") {
      fetchDefinitions(answer).then(setEtymology).catch(() => {});
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${answer.toLowerCase()}`)
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (!data) return;
          const def = data[0]?.meanings?.[0]?.definitions?.[0]?.definition;
          if (def) setModernDef(def);
        })
        .catch(() => {});
    }
  }, [gameState, answer]);

  // Record daily result when game ends
  useEffect(() => {
    if (mode === "daily" && (gameState === "won" || gameState === "lost")) {
      recordDailyResult({ dayNumber, won: gameState === "won", guesses: guesses.length });
    }
  }, [gameState]);

  const nextPuzzle = () => {
    if (mode === "streak") {
      if (gameState === "lost") {
        const stats = recordStreakResult(streak);
        setStreakBest(stats.streakBest);
        setStreakOver(true);
        return;
      }
      setStreak((s) => s + 1);
      setStreakIndex((i) => i + 1);
    }
    setGuesses([]);
    setInput("");
    setGameState("playing");
    setEtymology(null);
    setModernDef("");
    setCopied(false);
  };

  const explores = guesses.filter((g) => g.mode === "explore").length;
  const solves = guesses.filter((g) => g.mode === "solve").length;
  const hasExplores = explores < MAX_EXPLORES;
  const hasSolves = solves < MAX_SOLVES;
  const exploreCap = answer.length;

  const keyStates = useMemo(() => {
    const s = {};
    guesses.forEach((g) => {
      if (g.mode === "explore") {
        [...g.word].forEach((c) => {
          if (answerSet.has(c)) s[c] = "found";
          else if (!s[c]) s[c] = "absent";
        });
      } else {
        g.revealedGreen.forEach((c) => {
          s[c] = "found";
        });
        g.revealedGrey.forEach((c) => {
          if (!s[c]) s[c] = "absent";
        });
      }
    });
    return s;
  }, [guesses, answerSet]);

  const visibleLetters = useMemo(
    () => getVisibleWord(answer, keyStates),
    [answer, keyStates]
  );
  const allFound = visibleLetters.length === answer.length;

  const totalActions = guesses.length;
  const visibleHints = totalActions >= 5 ? 2 : totalActions >= 3 ? 1 : 0;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const submit = useCallback(
    async (mode) => {
      if (gameState !== "playing" || checking) return;
      const g = input.trim().toUpperCase();

      if (!g || g.length < 3) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        showToast("Too short");
        return;
      }

      if (mode === "explore" && g.length > exploreCap) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        showToast(`Max ${exploreCap} letters`);
        return;
      }

      if (guesses.some((prev) => prev.word === g)) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        showToast("Already tried");
        return;
      }

      setChecking(true);
      const valid = await isWord(g);
      setChecking(false);

      if (!valid) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        showToast("Not in dictionary");
        return;
      }

      if (mode === "explore" && !hasExplores) {
        showToast("No explores left");
        return;
      }
      if (mode === "solve" && !hasSolves) {
        showToast("No solves left");
        return;
      }

      let entry = { word: g, mode, revealedGreen: [], revealedGrey: [] };

      // Both explore and solve can win
      if (g === answer) {
        [...g].forEach((c) => {
          if (answerSet.has(c)) entry.revealedGreen.push(c);
        });
        setGuesses((prev) => [...prev, entry]);
        setInput("");
        setGameState("won");
        return;
      }

      if (mode === "solve") {
        // Wrong solve — reveal 1 new green + 1 new grey
        const currentFound = new Set(
          Object.entries(keyStates)
            .filter(([, v]) => v === "found")
            .map(([k]) => k)
        );
        const currentAbsent = new Set(
          Object.entries(keyStates)
            .filter(([, v]) => v === "absent")
            .map(([k]) => k)
        );
        const guessLetters = [...new Set([...g])];
        const newGreen = guessLetters.find(
          (c) => answerSet.has(c) && !currentFound.has(c)
        );
        const newGrey = guessLetters.find(
          (c) => !answerSet.has(c) && !currentAbsent.has(c)
        );
        if (newGreen) entry.revealedGreen = [newGreen];
        if (newGrey) entry.revealedGrey = [newGrey];
      }

      const next = [...guesses, entry];
      setGuesses(next);
      setInput("");

      const nextExplores = next.filter((x) => x.mode === "explore").length;
      const nextSolves = next.filter((x) => x.mode === "solve").length;
      if (nextExplores >= MAX_EXPLORES && nextSolves >= MAX_SOLVES) {
        setGameState("lost");
      }
    },
    [input, guesses, answer, answerSet, gameState, hasExplores, hasSolves, keyStates, exploreCap, checking]
  );

  const handleKey = useCallback(
    (key) => {
      if (gameState !== "playing") return;
      if (key === "BACKSPACE") {
        setInput((c) => c.slice(0, -1));
        return;
      }
      if (/^[A-Z]$/.test(key) && input.length < 20) setInput((c) => c + key);
    },
    [input, gameState]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey) return;
      const k = e.key.toUpperCase();
      if (k === "BACKSPACE" || (/^[A-Z]$/.test(k) && k.length === 1)) {
        e.preventDefault();
        handleKey(k);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleKey]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [guesses.length]);

  const share = () => {
    const icons = guesses
      .map((g) =>
        g.word === answer ? "🟢" : g.mode === "explore" ? "🔍" : "🔴"
      )
      .join("");
    navigator.clipboard?.writeText(
      `Σ Semantics ${gameState === "won" ? guesses.length : "X"}/${MAX_EXPLORES + MAX_SOLVES}\n${icons}\n"${puzzle.clue}"`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const wordFontSize =
    visibleLetters.length <= 6 ? 36 : visibleLetters.length <= 10 ? 28 : 22;

  return (
    <div className="sem-page" style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        @keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-5px)}30%{transform:translateX(5px)}45%{transform:translateX(-3px)}60%{transform:translateX(3px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes resultIn{0%{opacity:0;transform:scale(.92)}70%{transform:scale(1.01)}100%{opacity:1;transform:scale(1)}}
        @keyframes letterPop{0%{opacity:0;transform:translateY(8px) scale(.7)}60%{transform:translateY(-2px) scale(1.08)}100%{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes toastIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .sem-row{animation:slideUp .35s ease-out both}
        .word-letter{display:inline-block;animation:letterPop .35s ease-out both}
        .sem-guess-list::-webkit-scrollbar{width:3px}
        .sem-guess-list::-webkit-scrollbar-track{background:transparent}
        .sem-guess-list::-webkit-scrollbar-thumb{background:rgba(184,142,74,.15);border-radius:3px}
        .kb-key{transition:transform .06s,background .2s}
        .kb-key:active{transform:scale(.9)!important}
        .action-btn{transition:transform .08s,opacity .2s}
        .action-btn:active{transform:scale(.95)!important}
        .action-btn:disabled{opacity:.3;cursor:default;transform:none!important}
        @media(min-width:768px){
          .sem-page{padding:48px 24px 64px!important}
          .sem-container{max-width:720px!important;gap:20px!important}
          .sem-header .sem-sigma{font-size:38px!important}
          .sem-header .sem-title{font-size:46px!important}
          .sem-clue-card{padding:24px 32px!important;border-radius:16px!important}
          .sem-clue-label{font-size:14px!important}
          .sem-clue-text{font-size:28px!important}
          .sem-word-area{min-height:80px!important;padding:18px 28px!important;border-radius:16px!important}
          .sem-input-preview{font-size:21px!important}
          .sem-action-row{gap:14px!important}
          .sem-action-btn{padding:18px 14px!important;border-radius:16px!important}
          .sem-action-label{font-size:24px!important}
          .sem-action-desc{font-size:14px!important}
          .sem-action-meta{font-size:12px!important}
          .sem-guess-row{padding:14px 18px!important;border-radius:12px!important}
          .sem-mode-badge{font-size:12px!important;padding:4px 12px!important}
          .sem-row-word{font-size:22px!important}
          .sem-result-card{padding:32px 28px!important;border-radius:18px!important}
          .sem-kb{max-width:580px!important;gap:8px!important}
          .sem-kb-row{gap:7px!important}
          .sem-kb-key{padding:20px 0!important;min-width:46px!important;max-width:54px!important;font-size:18px!important;border-radius:8px!important}
        }
        @media(min-width:1200px){
          .sem-container{max-width:800px!important;gap:24px!important}
          .sem-header .sem-sigma{font-size:44px!important}
          .sem-header .sem-title{font-size:52px!important}
          .sem-clue-text{font-size:32px!important}
          .sem-clue-label{font-size:15px!important}
          .sem-action-label{font-size:26px!important}
          .sem-row-word{font-size:24px!important}
          .sem-kb{max-width:660px!important}
          .sem-kb-key{padding:22px 0!important;min-width:52px!important;max-width:60px!important;font-size:19px!important}
        }
      `}</style>

      <div className="sem-container" style={S.container}>
        {/* Header */}
        <div className="sem-header" style={S.header}>
          <div style={S.headerTop}>
            {onBack && (
              <button onClick={onBack} style={S.backBtn}>&larr;</button>
            )}
            <div style={{ flex: 1 }} />
            {mode === "daily" && (
              <span style={S.modeTag}>Day #{getPuzzleNumber()}</span>
            )}
            {mode === "streak" && (
              <span style={S.modeTag}>Streak: {streak}</span>
            )}
          </div>
          <div style={S.rule} />
          <div style={S.titleRow}>
            <span className="sem-sigma" style={S.sigma}>Σ</span>
            <h1 className="sem-title" style={S.title}>Semantics</h1>
          </div>
          <div style={S.rule} />
        </div>

        {/* Daily already completed */}
        {mode === "daily" && dailyAlreadyDone && (
          <div className="sem-result-card" style={{ ...S.resultCard, animation: "resultIn .4s ease forwards" }}>
            <div style={{ fontSize: 28 }}>{dailyAlreadyDone.won ? "🏛️" : "📜"}</div>
            <div style={S.resLabel}>
              {dailyAlreadyDone.won ? "You solved today's puzzle" : "Today's word was"}
            </div>
            <div style={S.resWord}>{answer}</div>
            <div style={S.resScore}>
              {dailyAlreadyDone.guesses} guess{dailyAlreadyDone.guesses !== 1 ? "es" : ""}
            </div>
            <div style={{ ...S.journeyOld, marginTop: 4 }}>Come back tomorrow for a new word</div>
            <button onClick={onBack} style={S.shareBtn}>
              Back to menu
            </button>
          </div>
        )}

        {/* Clue + Timeline hints together */}
        {!(mode === "daily" && dailyAlreadyDone) && <div className="sem-clue-card" style={S.clueCard}>
          <div className="sem-clue-label" style={S.clueLabel}>Ancient Meaning</div>
          <div className="sem-clue-text" style={S.clueText}>"{puzzle.clue}"</div>
          {visibleHints > 0 && gameState === "playing" && (
            <div style={S.inlineHints}>
              <div style={S.hintsRule} />
              {puzzle.hints.slice(0, visibleHints).map((h, i) => (
                <div key={i} className="sem-row" style={S.hintCard}>
                  <span style={S.hintEra}>{h.era}</span>
                  <span style={S.hintDef}>"{h.def}"</span>
                </div>
              ))}
            </div>
          )}
        </div>}

        {/* Game UI — hidden when daily already completed */}
        {!(mode === "daily" && dailyAlreadyDone) && <>
        {/* Assembling word */}
        <div className="sem-word-area" style={S.wordArea}>
          {visibleLetters.length > 0 ? (
            <div style={S.wordDisplay}>
              {visibleLetters.map((lt, i) => (
                <span
                  key={`${lt.ch}-${i}`}
                  className="word-letter"
                  style={{
                    fontSize: wordFontSize,
                    color: lt.found
                      ? allFound ? "#b8daa8" : "#a8d898"
                      : "rgba(184,142,74,.5)",
                    textShadow: lt.found
                      ? allFound
                        ? "0 0 16px rgba(168,216,152,.3)"
                        : "0 0 8px rgba(106,158,90,.12)"
                      : "none",
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  {lt.found ? lt.ch : "_"}
                </span>
              ))}
            </div>
          ) : (
            <div style={S.wordDisplay}>
              {[...Array(answer.length)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: wordFontSize,
                    color: "rgba(184,142,74,.5)",
                    letterSpacing: ".08em",
                  }}
                >
                  _
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Input preview */}
        {input && gameState === "playing" && (
          <div className="sem-input-preview" style={S.inputPreview}>{input.toUpperCase()}</div>
        )}

        {/* Toast */}
        {toast && (
          <div style={{ ...S.toast, animation: "toastIn .2s ease" }}>
            {toast}
          </div>
        )}

        {/* Action buttons */}
        {gameState === "playing" && (
          <div className="sem-action-row" style={S.actionRow}>
            <button
              className="action-btn sem-action-btn"
              disabled={!hasExplores || input.length < 3 || checking}
              onClick={() => submit("explore")}
              style={{
                ...S.actionBtn,
                ...S.exploreBtn,
                ...(!hasExplores || input.length < 3 || checking ? S.btnDisabled : {}),
              }}
            >
              <span className="sem-action-label" style={S.actionLabel}>{checking ? "Checking…" : "Explore"}</span>
              <span className="sem-action-desc" style={S.actionDesc}>Checks which letters match</span>
              <span className="sem-action-meta" style={S.actionMeta}>
                Up to {exploreCap} letters · {MAX_EXPLORES - explores} left
              </span>
            </button>
            <button
              className="action-btn sem-action-btn"
              disabled={!hasSolves || input.length < 3 || checking}
              onClick={() => submit("solve")}
              style={{
                ...S.actionBtn,
                ...S.solveBtn,
                ...(!hasSolves || input.length < 3 || checking ? S.btnDisabled : {}),
              }}
            >
              <span className="sem-action-label" style={S.actionLabel}>Solve</span>
              <span className="sem-action-desc" style={S.actionDesc}>Guess the answer, 1 hint if wrong</span>
              <span className="sem-action-meta" style={S.actionMeta}>
                Any length · {MAX_SOLVES - solves} left
              </span>
            </button>
          </div>
        )}

        {/* Guess list */}
        {guesses.length > 0 && (
          <div className="sem-guess-list" style={S.guessList}>
            {guesses.map((g, i) => {
              const won = g.word === answer;
              const isExplore = g.mode === "explore";
              const revGreenSet = new Set(g.revealedGreen);
              const revGreySet = new Set(g.revealedGrey);

              return (
                <div
                  key={i}
                  className="sem-row sem-guess-row"
                  style={{
                    ...S.guessRow,
                    borderLeftColor: won
                      ? "#7aaa5e"
                      : isExplore
                      ? "#b88e4a"
                      : "#8a6a5a",
                    background: won ? "rgba(106,158,90,.07)" : undefined,
                  }}
                >
                  <div style={S.rowTop}>
                    <span
                      className="sem-mode-badge"
                      style={{
                        ...S.modeBadge,
                        background: won
                          ? "rgba(106,158,90,.15)"
                          : isExplore
                          ? "rgba(184,142,74,.12)"
                          : "rgba(138,106,90,.12)",
                        color: won
                          ? "#a8d898"
                          : isExplore
                          ? "#cbb87a"
                          : "#b8988a",
                        borderColor: won
                          ? "rgba(106,158,90,.25)"
                          : isExplore
                          ? "rgba(184,142,74,.2)"
                          : "rgba(138,106,90,.2)",
                      }}
                    >
                      {won ? "✓ solved" : isExplore ? "explore" : "solve"}
                    </span>
                    <span className="sem-row-word" style={S.rowWordWrap}>
                      {[...g.word].map((ch, ci) => {
                        let color = "#2a2622";
                        if (isExplore || won) {
                          color = answerSet.has(ch) ? "#a8d898" : "#3d3830";
                        } else {
                          if (revGreenSet.has(ch)) color = "#a8d898";
                          else if (revGreySet.has(ch)) color = "#3d3830";
                          else color = "#5a5448";
                        }
                        return (
                          <span key={ci} style={{ color }}>
                            {ch}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={listEndRef} />
          </div>
        )}

        {/* Result */}
        {gameState !== "playing" && (
          <div
            className="sem-result-card" style={{ ...S.resultCard, animation: "resultIn .4s ease forwards" }}
          >
            <div style={{ fontSize: 28 }}>
              {gameState === "won" ? "🏛️" : "📜"}
            </div>
            <div style={S.resLabel}>
              {gameState === "won" ? "" : "The word was"}
            </div>
            <div style={S.resWord}>{answer}</div>
            <div style={S.resJourney}>
              <span style={S.journeyOld}>"{puzzle.clue}"</span>
              <span style={S.journeyArrow}>↓</span>
              {modernDef ? (
                <span style={S.journeyNew}>"{modernDef}"</span>
              ) : (
                <span style={S.journeyNew}>
                  {answer.charAt(0) + answer.slice(1).toLowerCase()} — as we know it today
                </span>
              )}
            </div>
            {etymology && (etymology.obsolete.length > 0 || etymology.archaic.length > 0) && (
              <div style={S.etymologySection}>
                <div style={S.etymLabel}>Word Journey — from Wiktionary</div>
                {etymology.obsolete.map((d, i) => (
                  <div key={`obs-${i}`} style={S.etymEntry}>
                    <span style={S.etymBadge}>obsolete</span>
                    <span style={S.etymDef}>{d.definition}</span>
                  </div>
                ))}
                {etymology.archaic.map((d, i) => (
                  <div key={`arc-${i}`} style={S.etymEntry}>
                    <span style={{ ...S.etymBadge, color: "#b88e4a", borderColor: "rgba(184,142,74,.3)" }}>{d.label}</span>
                    <span style={S.etymDef}>{d.definition}</span>
                  </div>
                ))}
              </div>
            )}
            {gameState === "won" && (
              <div style={S.resScore}>
                {explores} explore{explores !== 1 ? "s" : ""} + {solves} solve
                {solves !== 1 ? "s" : ""}
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={share} style={S.shareBtn}>
                {copied ? "Copied ✓" : "Share result"}
              </button>
              {mode === "daily" && (
                <button
                  onClick={onBack}
                  style={{ ...S.shareBtn, color: "#a8d898", borderColor: "rgba(106,158,90,.22)" }}
                >
                  Back to menu
                </button>
              )}
              {mode === "streak" && gameState === "won" && (
                <button
                  onClick={nextPuzzle}
                  style={{ ...S.shareBtn, color: "#a8d898", borderColor: "rgba(106,158,90,.22)" }}
                >
                  Next word
                </button>
              )}
              {mode === "streak" && gameState === "lost" && (
                <button
                  onClick={onBack}
                  style={{ ...S.shareBtn, color: "#b8988a", borderColor: "rgba(138,106,90,.22)" }}
                >
                  Back to menu
                </button>
              )}
            </div>
          </div>
        )}

        {/* Streak over overlay */}
        {mode === "streak" && streakOver && (
          <div className="sem-result-card" style={{ ...S.resultCard, animation: "resultIn .4s ease forwards" }}>
            <div style={{ fontSize: 28 }}>🔥</div>
            <div style={S.resLabel}>Streak Over</div>
            <div style={S.resWord}>{streak}</div>
            <div style={S.resScore}>
              {streak === 1 ? "1 word solved" : `${streak} words solved in a row`}
            </div>
            {streakBest > 0 && (
              <div style={{ ...S.journeyOld, marginTop: 2 }}>
                Best ever: {streakBest}
              </div>
            )}
            <button onClick={onBack} style={S.shareBtn}>
              Back to menu
            </button>
          </div>
        )}

        {/* Keyboard */}
        {gameState === "playing" && (
          <div className="sem-kb" style={S.keyboard}>
            {KB_ROWS.map((row, ri) => (
              <div key={ri} className="sem-kb-row" style={S.kbRow}>
                {ri === 2 && (
                  <button
                    className="kb-key sem-kb-key"
                    onClick={() => handleKey("BACKSPACE")}
                    style={{
                      ...S.kbKey,
                      ...S.kbWide,
                      background: "rgba(232,216,180,.05)",
                      color: "#8a7d60",
                    }}
                  >
                    ⌫
                  </button>
                )}
                {[...row].map((k) => {
                  const st = keyStates[k];
                  return (
                    <button
                      key={k}
                      className="kb-key sem-kb-key"
                      onClick={() => handleKey(k)}
                      style={{
                        ...S.kbKey,
                        background:
                          st === "found"
                            ? "rgba(106,158,90,.28)"
                            : st === "absent"
                            ? "#1e1c18"
                            : "rgba(232,216,180,.07)",
                        color:
                          st === "found"
                            ? "#a8d898"
                            : st === "absent"
                            ? "#3a3630"
                            : "#c8bca0",
                        border:
                          st === "found"
                            ? "1px solid rgba(106,158,90,.3)"
                            : "1px solid transparent",
                      }}
                    >
                      {k}
                    </button>
                  );
                })}
                {ri === 2 && <span style={{ flex: 1.5, maxWidth: 50 }} />}
              </div>
            ))}
          </div>
        )}
        </>}

      </div>
    </div>
  );
}

// --- Styles ---
const S = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(178deg, #1c1914 0%, #221e18 50%, #1a1712 100%)",
    display: "flex",
    justifyContent: "center",
    padding: "14px 12px 28px",
    fontFamily: "'Lora', Georgia, serif",
    color: "#ddd0b8",
    userSelect: "none",
  },
  container: {
    width: "100%",
    maxWidth: 460,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },

  header: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  rule: {
    width: "50%",
    height: 1,
    background:
      "linear-gradient(90deg, transparent, rgba(184,142,74,.22), transparent)",
  },
  titleRow: { display: "flex", alignItems: "baseline", gap: 10 },
  sigma: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 24,
    color: "#b88e4a",
    opacity: 0.55,
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 30,
    fontWeight: 700,
    margin: 0,
    letterSpacing: ".08em",
    color: "#e8d8b4",
    textTransform: "uppercase",
  },

  clueCard: {
    width: "100%",
    background: "rgba(232,216,180,.025)",
    border: "1px solid rgba(184,142,74,.1)",
    borderRadius: 10,
    padding: "14px 20px",
    textAlign: "center",
  },
  clueLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color: "#b88e4a",
    marginBottom: 7,
  },
  clueText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 19,
    fontWeight: 500,
    fontStyle: "italic",
    color: "#e0d4be",
    lineHeight: 1.5,
  },

  wordArea: {
    width: "100%",
    minHeight: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    background: "rgba(232,216,180,.015)",
    borderRadius: 10,
    border: "1px solid rgba(184,142,74,.06)",
  },
  wordDisplay: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 700,
    letterSpacing: ".14em",
    textAlign: "center",
    lineHeight: 1.3,
  },
  wordPlaceholder: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 30,
    fontWeight: 700,
    color: "rgba(184,142,74,.12)",
  },

  inputPreview: {
    fontFamily: "'Lora', serif",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: ".12em",
    color: "#8a7d60",
    textTransform: "uppercase",
    textAlign: "center",
  },

  toast: {
    background: "rgba(184,142,74,.15)",
    border: "1px solid rgba(184,142,74,.25)",
    borderRadius: 8,
    padding: "6px 16px",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 12,
    fontWeight: 600,
    color: "#cbb87a",
    letterSpacing: ".04em",
  },

  actionRow: { width: "100%", display: "flex", gap: 8 },
  actionBtn: {
    flex: 1,
    borderRadius: 10,
    padding: "10px 8px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    border: "1px solid transparent",
  },
  exploreBtn: {
    background: "rgba(184,142,74,.1)",
    border: "1px solid rgba(184,142,74,.2)",
  },
  solveBtn: {
    background: "rgba(106,158,90,.1)",
    border: "1px solid rgba(106,158,90,.2)",
  },
  btnDisabled: {},
  actionLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: ".06em",
    color: "#e0d4be",
  },
  actionDesc: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 10,
    fontStyle: "italic",
    color: "#8a7d60",
    letterSpacing: ".03em",
  },
  actionMeta: {
    fontFamily: "'Lora', serif",
    fontSize: 9,
    fontWeight: 500,
    color: "#5a5448",
    letterSpacing: ".03em",
    marginTop: 1,
  },

  guessList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxHeight: 180,
    overflowY: "auto",
    paddingRight: 3,
  },
  guessRow: {
    background: "rgba(232,216,180,.02)",
    borderRadius: 8,
    padding: "10px 12px",
    borderLeft: "3px solid #8a5a50",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  rowTop: { display: "flex", alignItems: "center", gap: 8 },
  modeBadge: {
    fontSize: 9,
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 4,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    border: "1px solid transparent",
    flexShrink: 0,
  },
  rowWordWrap: {
    fontFamily: "'Lora', serif",
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: ".1em",
  },

  winLine: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13,
    color: "#a8d898",
    fontStyle: "italic",
  },

  modernDefRow: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  modernDefLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "#a8d898",
  },
  modernDefText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: 500,
    color: "#a8d898",
    lineHeight: 1.4,
    opacity: 0.7,
  },
  inlineHints: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  hintsRule: {
    width: "30%",
    height: 1,
    background:
      "linear-gradient(90deg, transparent, rgba(184,142,74,.12), transparent)",
    marginBottom: 2,
  },
  hintsLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "#5a5448",
    textAlign: "center",
  },
  hintCard: {
    width: "100%",
    background: "rgba(232,216,180,.02)",
    borderRadius: 6,
    padding: "8px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderLeft: "2px solid #8a7a50",
  },
  hintEra: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "#b88e4a",
  },
  hintDef: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: 500,
    color: "#c8bca0",
    lineHeight: 1.4,
  },

  resultCard: {
    width: "100%",
    background: "rgba(232,216,180,.035)",
    border: "1px solid rgba(184,142,74,.18)",
    borderRadius: 12,
    padding: "22px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
  },
  resLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    color: "#8a7d60",
    fontStyle: "italic",
  },
  resWord: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: ".06em",
    color: "#e8d8b4",
    textTransform: "uppercase",
  },
  resJourney: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    margin: "2px 0",
    maxWidth: 320,
  },
  journeyOld: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 12,
    fontStyle: "italic",
    color: "#8a7a60",
    lineHeight: 1.4,
  },
  journeyArrow: { color: "#5a5040", fontSize: 13 },
  journeyNew: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 12,
    color: "#a8d898",
    fontStyle: "italic",
  },
  resScore: {
    fontFamily: "'Lora', serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#b88e4a",
  },
  shareBtn: {
    background: "rgba(184,142,74,.1)",
    border: "1px solid rgba(184,142,74,.22)",
    borderRadius: 6,
    padding: "9px 22px",
    fontSize: 12,
    fontFamily: "'Lora', serif",
    fontWeight: 500,
    color: "#cbb87a",
    cursor: "pointer",
    marginTop: 2,
  },

  etymologySection: {
    width: "100%",
    background: "rgba(232,216,180,.02)",
    border: "1px solid rgba(184,142,74,.08)",
    borderRadius: 8,
    padding: "10px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    textAlign: "left",
  },
  etymLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: ".14em",
    textTransform: "uppercase",
    color: "#5a5448",
    textAlign: "center",
    marginBottom: 2,
  },
  etymEntry: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  },
  etymBadge: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: ".06em",
    textTransform: "uppercase",
    color: "#8a6a5a",
    border: "1px solid rgba(138,106,90,.25)",
    borderRadius: 3,
    padding: "1px 5px",
    flexShrink: 0,
  },
  etymDef: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 12,
    fontStyle: "italic",
    color: "#c8bca0",
    lineHeight: 1.4,
  },

  keyboard: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: "100%",
    maxWidth: 400,
  },
  kbRow: { display: "flex", justifyContent: "center", gap: 4 },
  kbKey: {
    borderRadius: 5,
    padding: "13px 0",
    minWidth: 27,
    flex: 1,
    maxWidth: 34,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'Lora', serif",
    cursor: "pointer",
    border: "1px solid transparent",
    WebkitTapHighlightColor: "transparent",
    textAlign: "center",
  },
  kbWide: { flex: 1.5, maxWidth: 50, fontSize: 17 },

  headerTop: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    minHeight: 24,
  },
  backBtn: {
    background: "none",
    border: "none",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 18,
    color: "#8a7d60",
    cursor: "pointer",
    padding: "2px 8px 2px 0",
    opacity: 0.7,
  },
  modeTag: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "#b88e4a",
    opacity: 0.7,
  },
};
