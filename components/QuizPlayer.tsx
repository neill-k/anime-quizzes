"use client";

import { useState, useEffect, useCallback } from "react";
import type { Quiz } from "@/data/quizzes";
import Link from "next/link";

interface QuizPlayerProps {
  quiz: Quiz;
}

export default function QuizPlayer({ quiz }: QuizPlayerProps) {
  const { questions, ranks, theme } = quiz;
  const TOTAL = questions.length;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"start" | "quiz" | "result">("start");
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

  const handleSelect = useCallback(
    (i: number) => {
      if (revealed) return;
      setSelected(i);
      setRevealed(true);
      if (i === q.answer) {
        setScore((s) => s + 1);
      } else {
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 500);
      }
    },
    [revealed, q.answer]
  );

  const handleNext = useCallback(() => {
    if (current + 1 >= TOTAL) {
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }, [current, TOTAL]);

  const handleRestart = useCallback(() => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setRevealed(false);
    setPhase("start");
  }, []);

  const pct = Math.round((score / TOTAL) * 100);

  const getRank = useCallback(() => {
    for (const rank of ranks) {
      if (pct >= rank.minPct) return rank;
    }
    return ranks[ranks.length - 1];
  }, [pct, ranks]);

  const rank = getRank();

  const progressWidth = `${((current + (revealed ? 1 : 0)) / TOTAL) * 100}%`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: theme.font,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background particles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${theme.accent}22 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px, 30px 30px",
          backgroundPosition: "0 0, 15px 15px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Back nav */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <Link
          href="/"
          style={{
            color: theme.textSecondary,
            fontSize: "13px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            borderRadius: "6px",
            border: `1px solid ${theme.borderColor}`,
            background: "rgba(0,0,0,0.3)",
            transition: "color 0.2s",
          }}
        >
          <span style={{ fontSize: "16px" }}>&larr;</span> All Quizzes
        </Link>
      </div>

      {/* Card */}
      <div
        style={{
          background: theme.cardBg,
          border: `1px solid ${theme.borderColor}`,
          borderRadius: "8px",
          boxShadow: `0 0 0 1px ${theme.accent}0d, 0 24px 80px rgba(0,0,0,0.8), inset 0 1px 0 ${theme.accent}1a`,
          width: "100%",
          maxWidth: "620px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ padding: "40px 48px" }}>
          {/* START SCREEN */}
          {phase === "start" && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: theme.accentDim,
                  border: `1px solid ${theme.accent}4d`,
                  borderRadius: "4px",
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  color: theme.accent,
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                {quiz.badgeLabel}
              </div>
              <div
                style={{
                  fontSize: "clamp(26px, 5vw, 40px)",
                  fontWeight: 800,
                  color: theme.textPrimary,
                  lineHeight: 1.1,
                  marginBottom: "12px",
                  letterSpacing: "-0.5px",
                }}
              >
                {quiz.title}
              </div>
              <div
                style={{
                  color: theme.textSecondary,
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                }}
              >
                {TOTAL} questions &bull; {quiz.description}
              </div>
              <div
                style={{
                  height: "1px",
                  background: `linear-gradient(to right, transparent, ${theme.borderColor}, transparent)`,
                  margin: "28px -48px",
                }}
              />
              <div
                style={{
                  color: theme.textSecondary,
                  fontSize: "14px",
                  lineHeight: 2,
                }}
              >
                {quiz.categories.join(" \u00B7 ")}
              </div>
              <div>
                <button
                  onClick={() => setPhase("quiz")}
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}aa)`,
                    border: "none",
                    borderRadius: "6px",
                    padding: "16px 48px",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginTop: "32px",
                    boxShadow: `0 4px 15px ${theme.accent}33`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accent}44`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}33`;
                  }}
                >
                  {quiz.startButtonText}
                </button>
              </div>
            </div>
          )}

          {/* QUIZ */}
          {phase === "quiz" && (
            <div
              style={{
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {/* Progress */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "4px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px",
                    marginRight: "16px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: `linear-gradient(to right, ${theme.accentSecondary}, ${theme.accent})`,
                      borderRadius: "2px",
                      transition: "width 0.4s ease",
                      width: progressWidth,
                    }}
                  />
                </div>
                <div
                  style={{
                    color: theme.textSecondary,
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {current + 1} / {TOTAL}
                </div>
              </div>

              {/* Category + Score */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: `${theme.accentSecondary}1a`,
                    border: `1px solid ${theme.accentSecondary}33`,
                    borderRadius: "4px",
                    padding: "4px 12px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    color: theme.accentSecondary,
                    textTransform: "uppercase",
                  }}
                >
                  {q.category}
                </div>
                <div style={{ color: theme.accent, fontSize: "14px", fontWeight: 600 }}>
                  {score} correct
                </div>
              </div>

              {/* Question */}
              <div
                style={{
                  fontSize: "clamp(16px, 2.5vw, 19px)",
                  fontWeight: 500,
                  color: theme.textPrimary,
                  lineHeight: 1.5,
                  marginBottom: "28px",
                  animation: wrongShake ? "shake 0.4s ease" : "none",
                }}
              >
                {q.q}
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {q.options.map((opt, i) => {
                  let bg = "rgba(255,255,255,0.02)";
                  let border = "rgba(255,255,255,0.08)";
                  let color = theme.textSecondary;
                  let shadow = "none";
                  let numColor = theme.textSecondary;

                  if (revealed) {
                    if (i === q.answer) {
                      bg = "rgba(74, 222, 128, 0.1)";
                      border = "rgba(74, 222, 128, 0.4)";
                      color = "#4ade80";
                      shadow = "0 0 20px rgba(74, 222, 128, 0.15)";
                      numColor = "#4ade80";
                    } else if (i === selected) {
                      bg = "rgba(248, 113, 113, 0.1)";
                      border = "rgba(248, 113, 113, 0.4)";
                      color = "#f87171";
                      numColor = "#f87171";
                    } else {
                      bg = "rgba(255,255,255,0.01)";
                      border = "rgba(255,255,255,0.03)";
                      color = "rgba(255,255,255,0.2)";
                      numColor = "rgba(255,255,255,0.2)";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      style={{
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
                        fontWeight: 500,
                        fontFamily: theme.font,
                      }}
                      onMouseEnter={(e) => {
                        if (!revealed) {
                          e.currentTarget.style.background = `${theme.accent}0d`;
                          e.currentTarget.style.borderColor = `${theme.accent}33`;
                          e.currentTarget.style.color = theme.textPrimary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!revealed) {
                          e.currentTarget.style.background = bg;
                          e.currentTarget.style.borderColor = border;
                          e.currentTarget.style.color = color;
                        }
                      }}
                    >
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "4px",
                          background: "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          flexShrink: 0,
                          color: numColor,
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span>{opt}</span>
                      {revealed && i === q.answer && (
                        <span style={{ marginLeft: "auto", fontSize: "18px", color: "#4ade80" }}>
                          &#10003;
                        </span>
                      )}
                      {revealed && i === selected && i !== q.answer && (
                        <span style={{ marginLeft: "auto", fontSize: "18px", color: "#f87171" }}>
                          &#10007;
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next button */}
              {revealed && (
                <button
                  onClick={handleNext}
                  style={{
                    marginTop: "28px",
                    width: "100%",
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}aa)`,
                    border: "none",
                    borderRadius: "6px",
                    padding: "16px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    boxShadow: `0 4px 15px ${theme.accent}33`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {current + 1 >= TOTAL ? "See Results" : "Next Question \u2192"}
                </button>
              )}
            </div>
          )}

          {/* RESULT */}
          {phase === "result" && (
            <div style={{ textAlign: "center" }} className="animate-fade-in-up">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: theme.accentDim,
                  border: `1px solid ${theme.accent}4d`,
                  borderRadius: "4px",
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  color: theme.accent,
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                Quiz Complete
              </div>
              <div
                style={{
                  fontSize: "clamp(26px, 5vw, 36px)",
                  fontWeight: 800,
                  color: theme.textPrimary,
                  lineHeight: 1.1,
                  marginBottom: "24px",
                }}
              >
                Results
              </div>
              <div
                style={{
                  height: "1px",
                  background: `linear-gradient(to right, transparent, ${theme.borderColor}, transparent)`,
                  margin: "0 -48px 28px",
                }}
              />

              {/* Score circle */}
              <div
                style={{
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
                }}
              >
                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: 800,
                    color: rank.color,
                    lineHeight: 1,
                  }}
                >
                  {score}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: theme.textSecondary,
                    letterSpacing: "1px",
                    fontWeight: 500,
                    marginTop: "4px",
                  }}
                >
                  of {TOTAL}
                </div>
              </div>

              {/* Rank */}
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: rank.color,
                  marginBottom: "10px",
                }}
              >
                {rank.title}
              </div>
              <div
                style={{
                  color: theme.textSecondary,
                  fontSize: "15px",
                  marginBottom: "36px",
                  fontWeight: 500,
                }}
              >
                &ldquo;{rank.desc}&rdquo;
              </div>

              {/* Score breakdown */}
              <div
                style={{
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "6px",
                  padding: "20px",
                  marginBottom: "32px",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    color: theme.textSecondary,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    marginBottom: "16px",
                  }}
                >
                  PERFORMANCE
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: `linear-gradient(to right, ${rank.color}88, ${rank.color})`,
                        borderRadius: "4px",
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      color: rank.color,
                      fontSize: "15px",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pct}%
                  </div>
                </div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>
                  <span style={{ color: "#4ade80" }}>{score} correct</span>
                  {" \u00B7 "}
                  <span style={{ color: "#f87171" }}>{TOTAL - score} incorrect</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={handleRestart}
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}aa)`,
                    border: "none",
                    borderRadius: "6px",
                    padding: "14px 36px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: `0 4px 15px ${theme.accent}33`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accent}44`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}33`;
                  }}
                >
                  Retake
                </button>
                <Link
                  href="/"
                  style={{
                    border: `1px solid ${theme.borderColor}`,
                    borderRadius: "6px",
                    padding: "14px 36px",
                    color: theme.textSecondary,
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    background: "rgba(0,0,0,0.2)",
                    transition: "border-color 0.2s, color 0.2s",
                    display: "inline-block",
                  }}
                >
                  Browse More
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
