"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { quizzes, getAnimeList, getDifficultyList } from "@/data/quizzes";

const difficultyColors: Record<string, { bg: string; text: string; border: string }> = {
  beginner: { bg: "rgba(74, 222, 128, 0.1)", text: "#4ade80", border: "rgba(74, 222, 128, 0.3)" },
  intermediate: { bg: "rgba(250, 204, 21, 0.1)", text: "#facc15", border: "rgba(250, 204, 21, 0.3)" },
  expert: { bg: "rgba(248, 113, 113, 0.1)", text: "#f87171", border: "rgba(248, 113, 113, 0.3)" },
};

const animeAccents: Record<string, string> = {
  "One Piece": "#E8472F",
  "Hunter x Hunter": "#4ade80",
  "Dragon Ball": "#f97316",
};

export default function HomePage() {
  const animeList = getAnimeList();
  const difficultyList = getDifficultyList();

  const [selectedAnime, setSelectedAnime] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      if (selectedAnime && q.anime !== selectedAnime) return false;
      if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedAnime, selectedDifficulty]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0a0a14 0%, #0d0d1a 40%, #080812 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(167,139,250,0.08) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px, 30px 30px",
          backgroundPosition: "0 0, 15px 15px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <header
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "32px 24px 28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(167,139,250,0.1)",
              border: "1px solid rgba(167,139,250,0.25)",
              borderRadius: "4px",
              padding: "5px 14px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "3px",
              color: "#a78bfa",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Anime Trivia
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: "8px",
            }}
          >
            Anime Quizzes
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "400px", margin: "0 auto" }}>
            Choose a quiz, test your knowledge, and see how you rank
          </p>
        </header>

        {/* Filters */}
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "24px 24px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
            }}
          >
            {/* Anime filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#475569", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
                Anime
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => setSelectedAnime(null)}
                  style={{
                    padding: "6px 14px",
                    fontSize: "13px",
                    fontWeight: 600,
                    borderRadius: "6px",
                    border: `1px solid ${!selectedAnime ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)"}`,
                    background: !selectedAnime ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.02)",
                    color: !selectedAnime ? "#a78bfa" : "#64748b",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  All
                </button>
                {animeList.map((anime) => (
                  <button
                    key={anime}
                    onClick={() => setSelectedAnime(selectedAnime === anime ? null : anime)}
                    style={{
                      padding: "6px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                      borderRadius: "6px",
                      border: `1px solid ${selectedAnime === anime ? `${animeAccents[anime] || "#a78bfa"}66` : "rgba(255,255,255,0.08)"}`,
                      background: selectedAnime === anime ? `${animeAccents[anime] || "#a78bfa"}1a` : "rgba(255,255,255,0.02)",
                      color: selectedAnime === anime ? (animeAccents[anime] || "#a78bfa") : "#64748b",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {anime}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.08)" }} />

            {/* Difficulty filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#475569", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
                Difficulty
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  style={{
                    padding: "6px 14px",
                    fontSize: "13px",
                    fontWeight: 600,
                    borderRadius: "6px",
                    border: `1px solid ${!selectedDifficulty ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)"}`,
                    background: !selectedDifficulty ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.02)",
                    color: !selectedDifficulty ? "#a78bfa" : "#64748b",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  All
                </button>
                {difficultyList.map((diff) => {
                  const dc = difficultyColors[diff] || difficultyColors.beginner;
                  return (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                      style={{
                        padding: "6px 14px",
                        fontSize: "13px",
                        fontWeight: 600,
                        borderRadius: "6px",
                        border: `1px solid ${selectedDifficulty === diff ? dc.border : "rgba(255,255,255,0.08)"}`,
                        background: selectedDifficulty === diff ? dc.bg : "rgba(255,255,255,0.02)",
                        color: selectedDifficulty === diff ? dc.text : "#64748b",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        textTransform: "capitalize",
                      }}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Grid */}
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "28px 24px 60px",
          }}
        >
          {/* Count */}
          <div style={{ color: "#475569", fontSize: "13px", marginBottom: "20px" }}>
            {filteredQuizzes.length} {filteredQuizzes.length === 1 ? "quiz" : "quizzes"} available
          </div>

          {filteredQuizzes.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#475569",
                fontSize: "15px",
              }}
            >
              No quizzes match your filters. Try adjusting your selection.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredQuizzes.map((quiz) => {
                const dc = difficultyColors[quiz.difficulty] || difficultyColors.beginner;
                const accent = animeAccents[quiz.anime] || "#a78bfa";

                return (
                  <Link
                    key={quiz.slug}
                    href={`/quiz/${quiz.slug}`}
                    className="quiz-card"
                    style={{
                      textDecoration: "none",
                      background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "12px",
                      padding: "28px",
                      display: "block",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${accent}44`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: `linear-gradient(to right, ${accent}, transparent)`,
                        opacity: 0.5,
                      }}
                    />

                    {/* Badges row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                      <span
                        style={{
                          background: dc.bg,
                          color: dc.text,
                          border: `1px solid ${dc.border}`,
                          padding: "3px 10px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        {quiz.difficulty}
                      </span>
                      <span
                        style={{
                          color: "#475569",
                          fontSize: "12px",
                        }}
                      >
                        {quiz.questionCount} questions
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#f1f5f9",
                        marginBottom: "6px",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {quiz.title}
                    </h2>

                    {/* Anime name */}
                    <div
                      style={{
                        color: accent,
                        fontSize: "13px",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        marginBottom: "12px",
                      }}
                    >
                      {quiz.anime}
                    </div>

                    {/* Description */}
                    <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "16px", lineHeight: 1.5 }}>
                      {quiz.description}
                    </p>

                    {/* Categories */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {quiz.categories.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            fontSize: "11px",
                            color: "#64748b",
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                      {quiz.categories.length > 4 && (
                        <span style={{ fontSize: "11px", color: "#475569" }}>
                          +{quiz.categories.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Arrow */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "28px",
                        right: "28px",
                        color: "#334155",
                        fontSize: "20px",
                      }}
                    >
                      &rarr;
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
