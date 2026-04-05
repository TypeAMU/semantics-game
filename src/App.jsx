import { useState } from 'react'
import Semantics from './Semantics'
import HowToPlay from './HowToPlay'
import { getStats, getDailyResult } from './services/gameStats'
import { getPuzzleNumber } from './puzzles'

export default function App() {
  const [screen, setScreen] = useState('menu') // 'menu' | 'daily' | 'streak' | 'howto'
  const stats = getStats()
  const todayDone = getDailyResult(getPuzzleNumber())

  if (screen === 'howto') {
    return <HowToPlay onBack={() => setScreen('menu')} />
  }

  if (screen === 'daily' || screen === 'streak') {
    return <Semantics mode={screen} onBack={() => setScreen('menu')} />
  }

  return (
    <div className="menu-page" style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .menu-btn{transition:transform .08s,border-color .2s,background .2s}
        .menu-btn:hover{transform:translateY(-2px);border-color:rgba(232,196,88,.35)!important;background:rgba(232,216,180,.06)!important}
        .menu-btn:active{transform:scale(.97)!important}
        @media(min-width:768px){
          .menu-page{padding:72px 24px!important}
          .menu-container{max-width:600px!important;gap:44px!important}
          .menu-title{font-size:52px!important}
          .menu-subtitle{font-size:18px!important;max-width:420px!important}
          .menu-card{padding:30px 32px!important;border-radius:16px!important}
          .menu-card-title{font-size:28px!important}
          .menu-card-desc{font-size:17px!important}
        }
        @media(min-width:1200px){
          .menu-container{max-width:680px!important;gap:52px!important}
          .menu-title{font-size:60px!important}
          .menu-subtitle{font-size:20px!important;max-width:480px!important}
          .menu-card{padding:36px 38px!important}
          .menu-card-title{font-size:32px!important}
          .menu-card-desc{font-size:18px!important}
        }
      `}</style>

      <div className="menu-container" style={S.container}>
        <div style={S.header}>
          <div style={S.rule} />
          <div style={S.titleRow}>
            <span style={S.sigma}>Σ</span>
            <h1 className="menu-title" style={S.title}>Semantics</h1>
          </div>
          <div style={S.rule} />
        </div>

        <div style={S.menuCards}>
          <button
            className="menu-btn menu-card"
            onClick={() => setScreen('daily')}
            style={{ ...S.card, animationDelay: '0.05s' }}
          >
            <span style={S.cardIcon}>❦</span>
            <span className="menu-card-title" style={S.cardTitle}>Daily Puzzle</span>
            <span className="menu-card-desc" style={S.cardDesc}>One word per day. Come back tomorrow for a new one.</span>
            {todayDone && (
              <span style={{ ...S.cardStat, color: todayDone.won ? '#a8d898' : '#b8988a' }}>
                {todayDone.won ? 'Completed' : 'Attempted'}
              </span>
            )}
            {stats.dailyBestStreak > 0 && (
              <span style={S.cardStat}>
                Best: {stats.dailyBestStreak} day{stats.dailyBestStreak !== 1 ? 's' : ''}
              </span>
            )}
          </button>

          <button
            className="menu-btn menu-card"
            onClick={() => setScreen('streak')}
            style={{ ...S.card, animationDelay: '0.15s' }}
          >
            <span style={S.cardIcon}>❧</span>
            <span className="menu-card-title" style={S.cardTitle}>Streak</span>
            <span className="menu-card-desc" style={S.cardDesc}>Solve as many as you can in a row. One loss ends it all.</span>
            {stats.streakBest > 0 && (
              <span style={S.cardStat}>Best: {stats.streakBest}</span>
            )}
          </button>

          <button
            className="menu-btn menu-card"
            onClick={() => setScreen('howto')}
            style={{ ...S.card, ...S.cardHowTo, animationDelay: '0.25s' }}
          >
            <span style={S.cardIcon}>?</span>
            <span className="menu-card-title" style={S.cardTitle}>How to Play</span>
            <span className="menu-card-desc" style={S.cardDesc}>Learn the rules and mechanics.</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const S = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at top, #181410 0%, #0e0a06 55%, #050302 100%)',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 16px',
    fontFamily: "'Lora', Georgia, serif",
    color: '#ddd0b8',
    userSelect: 'none',
  },
  container: {
    width: '100%',
    maxWidth: 420,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 28,
  },
  header: {
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  rule: {
    width: '50%',
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(232,196,88,.22), transparent)',
  },
  titleRow: { display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 },
  sigma: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 28,
    color: '#e8c458',
    opacity: 0.55,
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 36,
    fontWeight: 700,
    margin: 0,
    letterSpacing: '.08em',
    color: '#f0d89a',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    fontStyle: 'italic',
    color: '#8a7d60',
    lineHeight: 1.5,
    maxWidth: 300,
    margin: '4px 0 4px',
  },
  menuCards: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    width: '100%',
    background: 'rgba(232,216,180,.03)',
    border: '1px solid rgba(232,196,88,.15)',
    borderRadius: 12,
    padding: '20px 22px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
    animation: 'fadeIn .4s ease-out both',
  },
  cardHowTo: {
    background: 'rgba(232,216,180,.015)',
    border: '1px solid rgba(232,196,88,.08)',
  },
  cardIcon: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 34,
    lineHeight: 1,
    color: '#e8c458',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '.06em',
    color: '#f0d89a',
  },
  cardDesc: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13,
    fontStyle: 'italic',
    color: '#8a7d60',
    lineHeight: 1.4,
  },
  cardStat: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '.08em',
    color: '#e8c458',
    marginTop: 2,
  },
}
