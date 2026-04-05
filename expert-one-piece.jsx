import React, { useState, useEffect } from "react";

// Expert Level Questions
const questions = [
  {
    q: "What is the exact final bounty of the Pirate King, Gol D. Roger?",
    options: ["5,046,000,000 Berries", "5,564,800,000 Berries", "4,388,000,000 Berries", "5,500,000,000 Berries"],
    answer: 1,
    category: "Bounties",
  },
  {
    q: "What is the name of the Celestial Dragon who shot Sabo's small fishing boat when he set sail as a child?",
    options: ["Saint Charlos", "Saint Rosward", "Saint Shalria", "Saint Jalmack"],
    answer: 3,
    category: "Lore",
  },
  {
    q: "Which commander led the 8th Division of the Whitebeard Pirates?",
    options: ["Namur", "Izo", "Haruta", "Rakuyo"],
    answer: 0,
    category: "Crew",
  },
  {
    q: "What was the name of the giant snake worshipped as a 'God' in Shandora 400 years ago?",
    options: ["Nola", "Yamata", "Kashigami", "Hebihime"],
    answer: 2,
    category: "Lore",
  },
  {
    q: "What is the name of the pirate captain who founded the Rumbar Pirates, Brook's former crew?",
    options: ["Fisher Tiger", "Calico Yorki", "Vander Decken", "John Giant"],
    answer: 1,
    category: "History",
  },
  {
    q: "According to Eiichiro Oda in an SBS, what real-world nationality would Nico Robin be?",
    options: ["French", "Egyptian", "Russian", "Indian"],
    answer: 2,
    category: "SBS Trivia",
  },
  {
    q: "Which of these characters ate the Jake Jake no Mi (Jacket-Jacket Fruit)?",
    options: ["Wapol", "Machvise", "Blamenco", "Kelly Funk"],
    answer: 3,
    category: "Devil Fruits",
  },
  {
    q: "In the Fish-Man Island arc, what rare blood type does Sanji possess that causes a medical crisis?",
    options: ["Type S (RH-)", "Type X", "Type F", "Type XF"],
    answer: 0,
    category: "Biology",
  },
  {
    q: "What is the name of the Supreme Grade Sword (Saijo O Wazamono) wielded by Dracule Mihawk?",
    options: ["Enma", "Yoru", "Shusui", "Ace"],
    answer: 1,
    category: "Weapons",
  },
  {
    q: "Who was the first person in the history of Impel Down to successfully escape from the prison?",
    options: ["Morley", "Monkey D. Luffy", "Shiki the Golden Lion", "Bartholomew Kuma"],
    answer: 2,
    category: "Lore",
  },
  {
    q: "What was the name of the legendary wood used to build both the Oro Jackson and the Thousand Sunny?",
    options: ["Sunlight Tree Eve", "Treasure Tree Adam", "Knowledge Tree of Ohara", "Whale Tree"],
    answer: 1,
    category: "Ships",
  },
  {
    q: "Who did Portgas D. Ace mistakenly attack during his cover story search for Blackbeard?",
    options: ["Brownbeard", "Peachbeard", "A random Marine", "Dr. Black Beard"],
    answer: 3,
    category: "Cover Stories",
  },
];

const TOTAL = questions.length;

function Skull({ size = 24, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C7.03 2 3 6.03 3 11c0 3.1 1.5 5.84 3.8 7.56V21h10.4v-2.44C19.5 16.84 21 14.1 21 11c0-4.97-4.03-9-9-9zm-2.5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function AnchorIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17 15.245v6.872c0 .228-.354.454-1.002.618C15.094 22.955 13.595 23 12 23s-3.094-.045-3.998-.265C7.354 22.57 7 22.345 7 22.117v-6.872l-1.5 1.5L4 15.245 12 7l8 8.245-1.5 1.5L17 15.245z" />
      <path d="M12 1a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
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
    if (pct >= 90) return { title: "Joy Boy", desc: "You possess the Voice of All Things.", color: "#FFD700" };
    if (pct >= 75) return { title: "Emperor of the Sea", desc: "A true ruler of the New World.", color: "#E8472F" };
    if (pct >= 50) return { title: "Yonko Commander", desc: "A formidable threat to the World Government.", color: "#D48B5B" };
    if (pct >= 30) return { title: "New World Rookie", desc: "The Grand Line broke your spirit.", color: "#B88B8B" };
    return { title: "Paradise Reject", desc: "You didn't even make it past Sabaody.", color: "#708090" };
  };

  const rank = getRank();

  // Updated styles for a more "Expert / Conqueror's Haki" theme
  const styles = {
    wrap: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #2b0a0a 0%, #1a0505 40%, #0a0000 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Georgia', serif",
      position: "relative",
      overflow: "hidden",
    },
    waves: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "120px",
      opacity: 0.1,
      pointerEvents: "none",
    },
    stars: {
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(circle, rgba(255,100,100,0.4) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
      backgroundSize: "80px 80px, 40px 40px",
      backgroundPosition: "0 0, 20px 20px",
      opacity: 0.15,
      pointerEvents: "none",
    },
    card: {
      background: "linear-gradient(145deg, #1f0b0b, #120505)",
      border: "1px solid rgba(220,160,60,0.3)",
      borderRadius: "4px",
      boxShadow: "0 0 0 1px rgba(220,160,60,0.1), 0 24px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(220,160,60,0.15)",
      width: "100%",
      maxWidth: "620px",
      position: "relative",
      zIndex: 1,
    },
    cardInner: {
      padding: "40px 48px",
    },
    cornerDecor: {
      position: "absolute",
      width: "40px",
      height: "40px",
      borderColor: "rgba(220,160,60,0.5)",
      borderStyle: "solid",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(220,50,50,0.15)",
      border: "1px solid rgba(220,50,50,0.4)",
      borderRadius: "2px",
      padding: "6px 14px",
      fontSize: "11px",
      letterSpacing: "3px",
      color: "#ff6b6b",
      textTransform: "uppercase",
      marginBottom: "24px",
    },
    title: {
      fontSize: "clamp(26px, 5vw, 40px)",
      fontWeight: "700",
      color: "#F5E6B8",
      lineHeight: 1.1,
      marginBottom: "12px",
      textShadow: "0 0 40px rgba(220,50,50,0.5)",
      letterSpacing: "-0.5px",
    },
    sub: {
      color: "#b09090",
      fontSize: "14px",
      letterSpacing: "0.5px",
    },
    divider: {
      height: "1px",
      background: "linear-gradient(to right, transparent, rgba(220,160,60,0.3), transparent)",
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
      background: "linear-gradient(to right, #e8472f, #C8A03C)",
      borderRadius: "2px",
      transition: "width 0.4s ease",
      width: `${((current + (revealed ? 1 : 0)) / TOTAL) * 100}%`,
    },
    progressText: {
      color: "#b09090",
      fontSize: "12px",
      letterSpacing: "1px",
      whiteSpace: "nowrap",
    },
    category: {
      display: "inline-block",
      background: "rgba(220,50,50,0.12)",
      border: "1px solid rgba(220,50,50,0.2)",
      borderRadius: "2px",
      padding: "3px 10px",
      fontSize: "11px",
      letterSpacing: "2px",
      color: "#ff6b6b",
      textTransform: "uppercase",
      marginBottom: "16px",
    },
    question: {
      fontSize: "clamp(15px, 2.5vw, 18px)",
      color: "#D4C9A8",
      lineHeight: 1.6,
      marginBottom: "28px",
      fontStyle: "italic",
    },
    options: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    btn: (i) => {
      let bg = "rgba(255,255,255,0.03)";
      let border = "rgba(255,255,255,0.08)";
      let color = "#c4b5b5";
      let transform = "translateX(0)";
      let shadow = "none";

      if (revealed) {
        if (i === q.answer) {
          bg = "rgba(60,180,100,0.12)";
          border = "rgba(60,180,100,0.5)";
          color = "#7DD4A0";
          shadow = "0 0 16px rgba(60,180,100,0.15)";
        } else if (i === selected && i !== q.answer) {
          bg = "rgba(232,71,47,0.12)";
          border = "rgba(232,71,47,0.5)";
          color = "#E8735A";
        } else {
          bg = "rgba(255,255,255,0.01)";
          border = "rgba(255,255,255,0.04)";
          color = "#665151";
        }
      }

      return {
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "3px",
        padding: "14px 18px",
        color,
        fontSize: "14px",
        textAlign: "left",
        cursor: revealed ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        transition: "all 0.2s ease",
        boxShadow: shadow,
        fontFamily: "'Georgia', serif",
      };
    },
    optionNum: (i) => ({
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      border: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      flexShrink: 0,
      fontFamily: "monospace",
      color: revealed && i === q.answer ? "#7DD4A0" : revealed && i === selected ? "#E8735A" : "#b09090",
    }),
    nextBtn: {
      marginTop: "24px",
      width: "100%",
      background: "linear-gradient(135deg, #e8472f, #942211)",
      border: "none",
      borderRadius: "3px",
      padding: "14px",
      color: "#F5E6B8",
      fontSize: "13px",
      fontWeight: "700",
      letterSpacing: "2px",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "'Georgia', serif",
      transition: "opacity 0.2s",
      boxShadow: "0 4px 15px rgba(232,71,47,0.3)",
    },
    startBtn: {
      background: "linear-gradient(135deg, #e8472f, #942211)",
      border: "none",
      borderRadius: "3px",
      padding: "16px 48px",
      color: "#F5E6B8",
      fontSize: "14px",
      fontWeight: "700",
      letterSpacing: "3px",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "'Georgia', serif",
      marginTop: "32px",
      boxShadow: "0 4px 15px rgba(232,71,47,0.3)",
    },
    scoreCircle: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      border: `3px solid ${rank.color}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 24px",
      boxShadow: `0 0 30px ${rank.color}33`,
    },
    scoreNum: {
      fontSize: "36px",
      fontWeight: "700",
      color: rank.color,
      lineHeight: 1,
    },
    scoreOf: {
      fontSize: "12px",
      color: "#b09090",
      letterSpacing: "1px",
    },
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.stars} />

      {/* Animated red waves SVG for the expert theme */}
      <svg style={styles.waves} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
          fill="#e8472f"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0,0"
            to="-720,0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      <div style={styles.card}>
        {/* Corner decorations */}
        <div style={{ ...styles.cornerDecor, top: 12, left: 12, borderWidth: "1px 0 0 1px" }} />
        <div style={{ ...styles.cornerDecor, top: 12, right: 12, borderWidth: "1px 1px 0 0" }} />
        <div style={{ ...styles.cornerDecor, bottom: 12, left: 12, borderWidth: "0 0 1px 1px" }} />
        <div style={{ ...styles.cornerDecor, bottom: 12, right: 12, borderWidth: "0 1px 1px 0" }} />

        <div style={styles.cardInner}>

          {/* ── START SCREEN ── */}
          {phase === "start" && (
            <div style={{ textAlign: "center" }}>
              <div style={styles.badge}>
                <Skull size={14} color="#ff6b6b" /> New World Edition
              </div>
              <div style={styles.title}>One Piece<br />Expert Trivia</div>
              <div style={styles.sub}>
                {TOTAL} questions • Only for true scholars of Ohara
              </div>
              <div style={{ ...styles.divider, margin: "28px -48px" }} />
              <div style={{ color: "#b09090", fontSize: "13px", lineHeight: 2 }}>
                ☠ Deep Lore &nbsp;·&nbsp; Cover Stories &nbsp;·&nbsp; SBS Trivia<br />
                Exact Bounties &nbsp;·&nbsp; History &nbsp;·&nbsp; Grand Fleet
              </div>
              <div>
                <button style={styles.startBtn} onClick={() => setPhase("quiz")}>
                  Enter the New World
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
                <div style={{ color: "#C8A03C", fontSize: "13px" }}>
                  {score} correct
                </div>
              </div>

              <div
                style={{
                  ...styles.question,
                  animation: wrongShake ? "shake 0.4s ease" : "none",
                }}
              >
                "{q.q}"
              </div>

              <div style={styles.options}>
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    style={styles.btn(i)}
                    onClick={() => handleSelect(i)}
                    onMouseEnter={e => {
                      if (!revealed) {
                        e.currentTarget.style.background = "rgba(220,160,60,0.08)";
                        e.currentTarget.style.borderColor = "rgba(220,160,60,0.3)";
                        e.currentTarget.style.color = "#F5E6B8";
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
                      <span style={{ marginLeft: "auto", fontSize: "16px", color: "#7DD4A0" }}>✓</span>
                    )}
                    {revealed && i === selected && i !== q.answer && (
                      <span style={{ marginLeft: "auto", fontSize: "16px", color: "#E8735A" }}>✗</span>
                    )}
                  </button>
                ))}
              </div>

              {revealed && (
                <button
                  style={styles.nextBtn}
                  onClick={handleNext}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {current + 1 >= TOTAL ? "See Results" : "Next Question →"}
                </button>
              )}
            </div>
          )}

          {/* ── RESULT ── */}
          {phase === "result" && (
            <div style={{ textAlign: "center" }}>
              <div style={styles.badge}>
                <AnchorIcon size={14} color="#ff6b6b" /> Voyage Complete
              </div>
              <div style={styles.title} >Results</div>
              <div style={{ ...styles.divider, margin: "24px -48px" }} />

              <div style={styles.scoreCircle}>
                <div style={styles.scoreNum}>{score}</div>
                <div style={styles.scoreOf}>of {TOTAL}</div>
              </div>

              <div style={{ fontSize: "22px", fontWeight: "700", color: rank.color, marginBottom: "8px", letterSpacing: "-0.3px" }}>
                {rank.title}
              </div>
              <div style={{ color: "#b09090", fontSize: "14px", fontStyle: "italic", marginBottom: "32px" }}>
                "{rank.desc}"
              </div>

              {/* Score breakdown bars */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "3px", padding: "20px", marginBottom: "28px", textAlign: "left" }}>
                <div style={{ color: "#b09090", fontSize: "11px", letterSpacing: "2px", marginBottom: "16px" }}>SCORE BREAKDOWN</div>
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
                  <div style={{ color: rank.color, fontSize: "14px", fontWeight: "700", whiteSpace: "nowrap" }}>{pct}%</div>
                </div>
                <div style={{ color: "#665151", fontSize: "12px" }}>
                  {score} correct · {TOTAL - score} incorrect
                </div>
              </div>

              <button
                style={{ ...styles.startBtn, marginTop: 0 }}
                onClick={handleRestart}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opac
