import React, { useState, useEffect } from "react";

// Intermediate Level HxH Questions
const questions = [
  {
    q: "What number badge did Hisoka wear during the 287th Hunter Exam?",
    options: ["Badge #44", "Badge #99", "Badge #404", "Badge #87"],
    answer: 0,
    category: "Hunter Exam",
  },
  {
    q: "Based on the Water Divination test, what is Killua Zoldyck's natural Nen affinity?",
    options: ["Enhancer", "Conjurer", "Transmuter", "Specialist"],
    answer: 2,
    category: "Nen Mechanics",
  },
  {
    q: "Which of Kurapika's chains specifically forces the target into a state of Zetsu, making them unable to use Nen?",
    options: ["Judgment Chain", "Holy Chain", "Chain Jail", "Dowsing Chain"],
    answer: 2,
    category: "Nen Abilities",
  },
  {
    q: "In Greed Island, which spell card allows a player to fly to a city they have previously visited?",
    options: ["Accompany", "Magnetic Force", "Return", "Levitation"],
    answer: 1,
    category: "Greed Island",
  },
  {
    q: "What is the name of the massive, terrifying guard dog that protects the Zoldyck Family estate?",
    options: ["Mike", "Cerberus", "Fluffy", "Gotoh"],
    answer: 0,
    category: "Characters",
  },
  {
    q: "What is the name of the fictional board game that Meruem plays obsessively with Komugi?",
    options: ["Shogi", "Go", "Gungi", "Xiangqi"],
    answer: 2,
    category: "Chimera Ant",
  },
  {
    q: "What identifying tattoo do all official members of the Phantom Troupe have somewhere on their body?",
    options: ["A black scorpion", "A coiled snake", "A red dragon", "A twelve-legged spider"],
    answer: 3,
    category: "Phantom Troupe",
  },
  {
    q: "At what floor in the Heavens Arena are participants finally allowed to use weapons and fight without a point system?",
    options: ["Floor 100", "Floor 150", "Floor 200", "Floor 250"],
    answer: 2,
    category: "Heavens Arena",
  },
  {
    q: "Which of these Hunters was NEVER a member of the Zodiacs?",
    options: ["Ging Freecss", "Kite", "Cheadle Yorkshire", "Pariston Hill"],
    answer: 1,
    category: "Hunter Association",
  },
  {
    q: "During the Yorknew City arc, which mafia family does Neon (the girl with the fortune-telling ability) belong to?",
    options: ["The Ten Dons", "The Nostrade Family", "The Vinsmoke Family", "The Zoldyck Family"],
    answer: 1,
    category: "Yorknew City",
  },
  {
    q: "Who served as the 12th Chairman of the Hunter Association?",
    options: ["Pariston Hill", "Ging Freecss", "Isaac Netero", "Biscuit Krueger"],
    answer: 2,
    category: "Hunter Association",
  },
  {
    q: "Which of the Chimera Ant Royal Guards has a cat-like appearance and specializes in manipulation and healing?",
    options: ["Shaiapouf", "Menthuthuyoupi", "Colt", "Neferpitou"],
    answer: 3,
    category: "Chimera Ant",
  },
];

const TOTAL = questions.length;

function LicenseIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <line x1="7" y1="15" x2="7.01" y2="15"></line>
      <line x1="11" y1="15" x2="17" y2="15"></line>
    </svg>
  );
}

function XIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState("start"); 
  const [revealed, setRevealed] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (phase === "quiz") {
      setAnimateIn(false);
      const t = setTimeout(() => setAnimateIn(true), 50);
      return () => clearTimeout(t);
    }
  }, [current, phase]);

  const q = questions[current];

  const handleSelect = (i) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.answer) {
      setScore((s) => s + 1);
    } else {
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
  };

  const handleNext = () => {
    if (current + 1 >= TOTAL) {
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setRevealed(false);
    setPhase("start");
  };

  const pct = Math.round((score / TOTAL) * 100);

  const getRank = () => {
    if (pct >= 90) return { title: "Triple-Star Hunter", desc: "A legend among the Association. Your Nen mastery is unmatched.", color: "#4ade80" };
    if (pct >= 75) return { title: "Single-Star Hunter", desc: "An elite professional who has made historical contributions.", color: "#2dd4bf" };
    if (pct >= 50) return { title: "Pro Hunter", desc: "You passed the Secret Exam. Welcome to the real world.", color: "#60a5fa" };
    if (pct >= 30) return { title: "Heavens Arena Floor 100", desc: "You have potential, but you need to learn Nen.", color: "#94a3b8" };
    return { title: "Tonpa's Victim", desc: "You drank the juice. Better luck next year.", color: "#64748b" };
  };

  const rank = getRank();

  // Updated styles for a Hunter Association (Green/Slate) aesthetic
  const styles = {
    wrap: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #091a10 0%, #102619 40%, #06120b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      position: "relative",
      overflow: "hidden",
    },
    waves: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "120px",
      opacity: 0.15,
      pointerEvents: "none",
    },
    stars: {
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(circle, rgba(74, 222, 128, 0.15) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
      backgroundSize: "60px 60px, 30px 30px",
      backgroundPosition: "0 0, 15px 15px",
      opacity: 0.5,
      pointerEvents: "none",
    },
    card: {
      background: "linear-gradient(145deg, #132b1e, #0c1a12)",
      border: "1px solid rgba(74, 222, 128, 0.2)",
      borderRadius: "8px",
      boxShadow: "0 0 0 1px rgba(74, 222, 128, 0.05), 0 24px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(74, 222, 128, 0.1)",
      width: "100%",
      maxWidth: "620px",
      position: "relative",
      zIndex: 1,
    },
    cardInner: {
      padding: "40px 48px",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(74, 222, 128, 0.1)",
      border: "1px solid rgba(74, 222, 128, 0.3)",
      borderRadius: "4px",
      padding: "6px 14px",
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "2px",
      color: "#4ade80",
      textTransform: "uppercase",
      marginBottom: "24px",
    },
    title: {
      fontSize: "clamp(26px, 5vw, 40px)",
      fontWeight: "800",
      color: "#f8fafc",
      lineHeight: 1.1,
      marginBottom: "12px",
      letterSpacing: "-0.5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    },
    sub: {
      color: "#94a3b8",
      fontSize: "15px",
      letterSpacing: "0.5px",
    },
    divider: {
      height: "1px",
      background: "linear-gradient(to right, transparent, rgba(74, 222, 128, 0.2), transparent)",
      margin: "0 -48px 32px",
    },
    progress: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    progressBar: {
      flex: 1,
      height: "4px",
      background: "rgba(255,255,255,0.06)",
      borderRadius: "2px",
      marginRight: "16px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(to right, #2dd4bf, #4ade80)",
      borderRadius: "2px",
      transition: "width 0.4s ease",
      width: `${((current + (revealed ? 1 : 0)) / TOTAL) * 100}%`,
    },
    progressText: {
      color: "#94a3b8",
      fontSize: "13px",
      fontWeight: "500",
      letterSpacing: "1px",
      whiteSpace: "nowrap",
    },
    category: {
      display: "inline-block",
      background: "rgba(45, 212, 191, 0.1)",
      border: "1px solid rgba(45, 212, 191, 0.2)",
      borderRadius: "4px",
      padding: "4px 12px",
      fontSize: "11px",
      fontWeight: "600",
      letterSpacing: "1px",
      color: "#2dd4bf",
      textTransform: "uppercase",
      marginBottom: "16px",
    },
    question: {
      fontSize: "clamp(16px, 2.5vw, 19px)",
      fontWeight: "500",
      color: "#f1f5f9",
      lineHeight: 1.5,
      marginBottom: "28px",
    },
    options: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    btn: (i) => {
      let bg = "rgba(255,255,255,0.02)";
      let border = "rgba(255,255,255,0.08)";
      let color = "#cbd5e1";
      let shadow = "none";

      if (revealed) {
        if (i === q.answer) {
          bg = "rgba(74, 222, 128, 0.1)";
          border = "rgba(74, 222, 128, 0.4)";
          color = "#4ade80";
          shadow = "0 0 20px rgba(74, 222, 128, 0.15)";
        } else if (i === selected && i !== q.answer) {
          bg = "rgba(248, 113, 113, 0.1)";
          border = "rgba(248, 113, 113, 0.4)";
          color = "#f87171";
        } else {
          bg = "rgba(255,255,255,0.01)";
          border = "rgba(255,255,255,0.03)";
          color = "#475569";
        }
      }

      return {
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "6px",
        padding: "16px 20px",
        color,
        fontSize: "15px",
        textAlign: "left",
        cursor: revealed ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        transition: "all 0.2s ease",
        boxShadow: shadow,
        fontWeight: "500",
      };
    },
    optionNum: (i) => ({
      width: "26px",
      height: "26px",
      borderRadius: "4px",
      background: "rgba(255,255,255,0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "700",
      flexShrink: 0,
      color: revealed && i === q.answer ? "#4ade80" : revealed && i === selected ? "#f87171" : "#94a3b8",
    }),
    nextBtn: {
      marginTop: "28px",
      width: "100%",
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      border: "none",
      borderRadius: "6px",
      padding: "16px",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "700",
      letterSpacing: "1px",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.2)",
    },
    startBtn: {
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      border: "none",
      borderRadius: "6px",
      padding: "16px 48px",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: "700",
      letterSpacing: "2px",
      textTransform: "uppercase",
      cursor: "pointer",
      marginTop: "32px",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.2)",
    },
    scoreCircle: {
      width: "130px",
      height: "130px",
      borderRadius: "50%",
      border: `4px solid ${rank.color}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 28px",
      boxShadow: `0 0 40px ${rank.color}33`,
      background: "rgba(0,0,0,0.2)",
    },
    scoreNum: {
      fontSize: "42px",
      fontWeight: "800",
      color: rank.color,
      lineHeight: 1,
    },
    scoreOf: {
      fontSize: "13px",
      color: "#94a3b8",
      letterSpacing: "1px",
      fontWeight: "500",
      marginTop: "4px"
    },
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.stars} />

      {/* Abstract geometric background elements */}
      <svg style={styles.waves} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,0 L1440,120 L0,120 Z" fill="rgba(74, 222, 128, 0.05)" />
        <path d="M1440,0 L0,120 L1440,120 Z" fill="rgba(45, 212, 191, 0.05)" />
      </svg>

      <div style={styles.card}>
        <div style={styles.cardInner}>

          {/* ── START SCREEN ── */}
          {phase === "start" && (
            <div style={{ textAlign: "center" }}>
              <div style={styles.badge}>
                <LicenseIcon size={14} color="#4ade80" /> Hunter Association
              </div>
              <div style={styles.title}>
                HUNTER <XIcon size={24} color="#2dd4bf" /> HUNTER
              </div>
              <div style={{ color: "#4ade80", fontSize: "12px", letterSpacing: "4px", marginBottom: "12px", fontWeight: "600" }}>
                INTERMEDIATE EXAM
              </div>
              <div style={styles.sub}>
                {TOTAL} questions • Test your Nen knowledge
              </div>
              <div style={{ ...styles.divider, margin: "32px -48px" }} />
              <div style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 2, fontWeight: "500" }}>
                Nen Mechanics &nbsp;·&nbsp; Greed Island &nbsp;·&nbsp; Phantom Troupe<br />
                Heavens Arena &nbsp;·&nbsp; Chimera Ants
              </div>
              <div>
                <button 
                  style={styles.startBtn} 
                  onClick={() => setPhase("quiz")}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(34, 197, 94, 0.3)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(34, 197, 94, 0.2)";
                  }}
                >
                  Take the Exam
                </button>
              </div>
            </div>
          )}

          {/* ── QUIZ ── */}
          {phase === "quiz" && (
            <div
              style={{
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              <div style={styles.progress}>
                <div style={styles.progressBar}>
                  <div style={styles.progressFill} />
                </div>
                <div style={styles.progressText}>
                  {current + 1} / {TOTAL}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={styles.category}>{q.category}</div>
                <div style={{ color: "#4ade80", fontSize: "14px", fontWeight: "600" }}>
                  {score} Points
                </div>
              </div>

              <div
                style={{
                  ...styles.question,
                  animation: wrongShake ? "shake 0.4s ease" : "none",
                }}
              >
                {q.q}
              </div>

              <div style={styles.options}>
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    style={styles.btn(i)}
                    onClick={() => handleSelect(i)}
                    onMouseEnter={e => {
                      if (!revealed) {
                        e.currentTarget.style.background = "rgba(74, 222, 128, 0.05)";
                        e.currentTarget.style.borderColor = "rgba(74, 222, 128, 0.2)";
                        e.currentTarget.style.color = "#f8fafc";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!revealed) {
                        Object.assign(e.currentTarget.style, styles.btn(i));
                      }
                    }}
                  >
                    <div style={styles.optionNum(i)}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span>{opt}</span>
                    {revealed && i === q.answer && (
                      <span style={{ marginLeft: "auto", fontSize: "18px", color: "#4ade80" }}>✓</span>
                    )}
                    {revealed && i === selected && i !== q.answer && (
                      <span style={{ marginLeft: "auto", fontSize: "18px", color: "#f87171" }}>✗</span>
                    )}
                  </button>
                ))}
              </div>

              {revealed && (
                <button
                  style={styles.nextBtn}
                  onClick={handleNext}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {current + 1 >= TOTAL ? "View Assessment" : "Next Question"}
                </button>
              )}
            </div>
          )}

          {/* ── RESULT ── */}
          {phase === "result" && (
            <div style={{ textAlign: "center" }}>
              <div style={styles.badge}>
                <LicenseIcon size={14} color="#4ade80" /> Exam Complete
              </div>
              <div style={{...styles.title, gap: '0', display: 'block'}} >Final Assessment</div>
              <div style={{ ...styles.divider, margin: "28px -48px" }} />

              <div style={styles.scoreCircle}>
                <div style={styles.scoreNum}>{score}</div>
                <div style={styles.scoreOf}>of {TOTAL}</div>
              </div>

              <div style={{ fontSize: "24px", fontWeight: "800", color: rank.color, marginBottom: "10px", letterSpacing: "-0.3px" }}>
                {rank.title}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "36px", fontWeight: "500" }}>
                "{rank.desc}"
              </div>

              {/* Score breakdown bars */}
              <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "20px", marginBottom: "32px", textAlign: "left" }}>
                <div style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", marginBottom: "16px" }}>PERFORMANCE METRICS</div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: `linear-gradient(to right, ${rank.color}88, ${rank.color})`,
                      borderRadius: "4px",
                      transition: "width 1s ease",
                    }} />
                  </div>
                  <div style={{ color: rank.color, fontSize: "15px", fontWeight: "800", whiteSpace: "nowrap" }}>{pct}%</div>
                </div>
                <div style={{ color: "#475569", fontSize: "13px", fontWeight: "500" }}>
                  <span style={{color: "#4ade80"}}>{score} correct</span> &nbsp;·&nbsp; <span style={{color: "#f87171"}}>{TOTAL - score} incorrect</span>
                </div>
              </div>

              <button
                style={{ ...styles.startBtn, marginTop: 0 }}
                onClick={handleRestart}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(34, 197, 94, 0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(34, 197, 94, 0.2)";
                }}
              >
                Retake Exam
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}


