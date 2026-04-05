export default function HowToPlay({ onBack }) {
  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .howto-back{transition:opacity .2s}
        .howto-back:hover{opacity:1!important}
      `}</style>

      <div style={S.container}>
        <button className="howto-back" onClick={onBack} style={S.backBtn}>
          &larr; Back
        </button>

        <div style={S.header}>
          <h1 style={S.title}>How to Play</h1>
          <div style={S.rule} />
        </div>

        <div style={S.section}>
          <h2 style={S.sectionTitle}>The Goal</h2>
          <p style={S.text}>
            Words change meaning over time. You're given an <em>ancient definition</em> of a common English word &mdash; one that no longer means what it used to. Guess the modern word.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.sectionTitle}>Your Tools</h2>

          <div style={S.toolCard}>
            <div style={{ ...S.toolBadge, background: 'rgba(184,142,74,.12)', color: '#cbb87a', borderColor: 'rgba(184,142,74,.2)' }}>
              Explore
            </div>
            <p style={S.toolDesc}>
              Type any real English word (up to the answer's length). The game reveals which of your letters appear in the answer. Use this to narrow down possibilities.
            </p>
            <p style={S.toolMeta}>3 explores available</p>
          </div>

          <div style={S.toolCard}>
            <div style={{ ...S.toolBadge, background: 'rgba(106,158,90,.12)', color: '#a8d898', borderColor: 'rgba(106,158,90,.2)' }}>
              Solve
            </div>
            <p style={S.toolDesc}>
              Guess the answer directly. If wrong, you get a free hint: one correct letter is revealed in green, and one wrong letter is greyed out.
            </p>
            <p style={S.toolMeta}>3 solves available</p>
          </div>
        </div>

        <div style={S.section}>
          <h2 style={S.sectionTitle}>Hints</h2>
          <p style={S.text}>
            As you use more actions, the clue card gains <em>timeline hints</em> showing how the word's meaning evolved through the centuries. These appear automatically after 3 and 5 total actions.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.sectionTitle}>Winning & Losing</h2>
          <p style={S.text}>
            You win by typing the exact answer in either Explore or Solve mode. You lose when all 3 explores and all 3 solves are used up without finding the word. The fewer actions you use, the better your score &mdash; solving on your first try is the best result.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.sectionTitle}>Game Modes</h2>

          <div style={S.modeRow}>
            <span style={S.modeIcon}>❦</span>
            <div>
              <span style={S.modeName}>Daily Puzzle</span>
              <p style={S.modeDesc}>A new word every day. Same word for everyone.</p>
            </div>
          </div>

          <div style={S.modeRow}>
            <span style={S.modeIcon}>❧</span>
            <div>
              <span style={S.modeName}>Streak</span>
              <p style={S.modeDesc}>Solve as many puzzles in a row as you can. One loss ends your streak.</p>
            </div>
          </div>
        </div>

        <button className="howto-back" onClick={onBack} style={{ ...S.backBtn, marginTop: 8 }}>
          &larr; Back to menu
        </button>
      </div>
    </div>
  )
}

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(178deg, #1c1914 0%, #221e18 50%, #1a1712 100%)',
    display: 'flex',
    justifyContent: 'center',
    padding: '24px 16px 40px',
    fontFamily: "'Lora', Georgia, serif",
    color: '#ddd0b8',
    userSelect: 'none',
  },
  container: {
    width: '100%',
    maxWidth: 440,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    animation: 'fadeIn .35s ease-out',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    color: '#8a7d60',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    padding: '4px 0',
    opacity: 0.7,
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: '.06em',
    color: '#e8d8b4',
    margin: 0,
  },
  rule: {
    width: '40%',
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(184,142,74,.22), transparent)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '.16em',
    textTransform: 'uppercase',
    color: '#b88e4a',
    margin: 0,
  },
  text: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 15,
    fontWeight: 400,
    color: '#c8bca0',
    lineHeight: 1.6,
    margin: 0,
  },
  toolCard: {
    background: 'rgba(232,216,180,.025)',
    border: '1px solid rgba(184,142,74,.08)',
    borderRadius: 10,
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  toolBadge: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '.06em',
    padding: '3px 10px',
    borderRadius: 5,
    border: '1px solid transparent',
    alignSelf: 'flex-start',
  },
  toolDesc: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    color: '#c8bca0',
    lineHeight: 1.5,
    margin: 0,
  },
  toolMeta: {
    fontFamily: "'Lora', serif",
    fontSize: 10,
    color: '#5a5448',
    margin: 0,
  },
  modeRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '8px 0',
  },
  modeIcon: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 28,
    lineHeight: 1,
    color: '#b88e4a',
    opacity: 0.75,
    flexShrink: 0,
    marginTop: 2,
  },
  modeName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 16,
    fontWeight: 700,
    color: '#e0d4be',
  },
  modeDesc: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13,
    fontStyle: 'italic',
    color: '#8a7d60',
    margin: '2px 0 0',
    lineHeight: 1.4,
  },
}
