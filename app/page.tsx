"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { quizzes, getAnimeList, getDifficultyList } from "@/data/quizzes";

type DesignId = "neon-grid" | "manga-paper" | "sunset-vapor" | "forest-shrine" | "terminal-arcade";

interface DesignPreset {
  id: DesignId;
  label: string;
  subtitle: string;
  pageBackground: string;
  pagePattern: string;
  headerBadgeBg: string;
  headerBadgeBorder: string;
  headerBadgeText: string;
  headingColor: string;
  subheadingColor: string;
  panelBg: string;
  panelBorder: string;
  panelRadius: string;
  inputBg: string;
  inputText: string;
  mutedText: string;
  quizCardBg: string;
  quizCardBorder: string;
  quizCardRadius: string;
  quizTitleColor: string;
  quizDescriptionColor: string;
  categoryChipBg: string;
  categoryChipBorder: string;
  categoryChipText: string;
  shadow: string;
  cardHoverLift: string;
}

const designPresets: DesignPreset[] = [
  {
    id: "neon-grid",
    label: "Neon Grid",
    subtitle: "Cyberpunk HUD with violet glows",
    pageBackground: "linear-gradient(145deg, #08090f 0%, #121226 55%, #0b081a 100%)",
    pagePattern:
      "radial-gradient(circle at 1px 1px, rgba(167,139,250,0.22) 1px, transparent 0), linear-gradient(to right, rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.08) 1px, transparent 1px)",
    headerBadgeBg: "rgba(167,139,250,0.14)",
    headerBadgeBorder: "rgba(167,139,250,0.35)",
    headerBadgeText: "#c4b5fd",
    headingColor: "#f5f3ff",
    subheadingColor: "#94a3b8",
    panelBg: "rgba(15, 20, 40, 0.65)",
    panelBorder: "rgba(148,163,184,0.25)",
    panelRadius: "12px",
    inputBg: "rgba(10, 14, 30, 0.92)",
    inputText: "#dbeafe",
    mutedText: "#64748b",
    quizCardBg: "linear-gradient(145deg, rgba(91,33,182,0.22), rgba(15,23,42,0.75))",
    quizCardBorder: "rgba(192,132,252,0.3)",
    quizCardRadius: "14px",
    quizTitleColor: "#ede9fe",
    quizDescriptionColor: "#94a3b8",
    categoryChipBg: "rgba(15,23,42,0.72)",
    categoryChipBorder: "rgba(192,132,252,0.25)",
    categoryChipText: "#cbd5e1",
    shadow: "0 30px 80px rgba(0,0,0,0.45)",
    cardHoverLift: "translateY(-6px)",
  },
  {
    id: "manga-paper",
    label: "Manga Paper",
    subtitle: "Ink-heavy monochrome panel layout",
    pageBackground: "linear-gradient(180deg, #f8f7f2 0%, #f0ede2 100%)",
    pagePattern:
      "radial-gradient(circle, rgba(15,23,42,0.12) 1px, transparent 1px), radial-gradient(circle, rgba(15,23,42,0.07) 1px, transparent 1px)",
    headerBadgeBg: "rgba(15,23,42,0.08)",
    headerBadgeBorder: "rgba(15,23,42,0.35)",
    headerBadgeText: "#111827",
    headingColor: "#030712",
    subheadingColor: "#374151",
    panelBg: "rgba(255,255,255,0.92)",
    panelBorder: "rgba(15,23,42,0.3)",
    panelRadius: "2px",
    inputBg: "#f9fafb",
    inputText: "#111827",
    mutedText: "#4b5563",
    quizCardBg: "linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)",
    quizCardBorder: "rgba(17,24,39,0.35)",
    quizCardRadius: "2px",
    quizTitleColor: "#111827",
    quizDescriptionColor: "#4b5563",
    categoryChipBg: "rgba(17,24,39,0.06)",
    categoryChipBorder: "rgba(17,24,39,0.22)",
    categoryChipText: "#1f2937",
    shadow: "6px 6px 0 rgba(15,23,42,0.3)",
    cardHoverLift: "translate(-2px, -2px)",
  },
  {
    id: "sunset-vapor",
    label: "Sunset Vapor",
    subtitle: "Warm gradients with retro glow",
    pageBackground: "linear-gradient(170deg, #2a1246 0%, #8b2f74 45%, #ff7849 100%)",
    pagePattern:
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.24) 0 1px, transparent 1px), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.16) 0 1px, transparent 1px)",
    headerBadgeBg: "rgba(253,230,138,0.22)",
    headerBadgeBorder: "rgba(253,230,138,0.55)",
    headerBadgeText: "#fef08a",
    headingColor: "#fff7ed",
    subheadingColor: "#fed7aa",
    panelBg: "rgba(64, 20, 70, 0.52)",
    panelBorder: "rgba(251,191,36,0.35)",
    panelRadius: "18px",
    inputBg: "rgba(54,18,58,0.88)",
    inputText: "#fff7ed",
    mutedText: "#ffedd5",
    quizCardBg: "linear-gradient(160deg, rgba(236,72,153,0.35), rgba(124,58,237,0.45))",
    quizCardBorder: "rgba(251,191,36,0.35)",
    quizCardRadius: "20px",
    quizTitleColor: "#fff7ed",
    quizDescriptionColor: "#ffedd5",
    categoryChipBg: "rgba(255,255,255,0.12)",
    categoryChipBorder: "rgba(255,255,255,0.22)",
    categoryChipText: "#fff7ed",
    shadow: "0 20px 50px rgba(36,10,48,0.5)",
    cardHoverLift: "translateY(-8px)",
  },
  {
    id: "forest-shrine",
    label: "Forest Shrine",
    subtitle: "Natural greens with soft card paper",
    pageBackground: "linear-gradient(170deg, #0d1b14 0%, #1a3b2d 50%, #224b37 100%)",
    pagePattern:
      "radial-gradient(circle at 25% 25%, rgba(187,247,208,0.22) 0 2px, transparent 2px), radial-gradient(circle at 70% 75%, rgba(134,239,172,0.16) 0 1px, transparent 1px)",
    headerBadgeBg: "rgba(187,247,208,0.18)",
    headerBadgeBorder: "rgba(187,247,208,0.45)",
    headerBadgeText: "#bbf7d0",
    headingColor: "#f0fdf4",
    subheadingColor: "#bbf7d0",
    panelBg: "rgba(17, 34, 25, 0.7)",
    panelBorder: "rgba(134,239,172,0.25)",
    panelRadius: "10px",
    inputBg: "rgba(11, 26, 19, 0.85)",
    inputText: "#dcfce7",
    mutedText: "#86efac",
    quizCardBg: "linear-gradient(145deg, rgba(34,74,53,0.88), rgba(18,52,36,0.9))",
    quizCardBorder: "rgba(187,247,208,0.3)",
    quizCardRadius: "12px",
    quizTitleColor: "#ecfdf5",
    quizDescriptionColor: "#bbf7d0",
    categoryChipBg: "rgba(187,247,208,0.12)",
    categoryChipBorder: "rgba(187,247,208,0.25)",
    categoryChipText: "#dcfce7",
    shadow: "0 24px 48px rgba(0,0,0,0.38)",
    cardHoverLift: "translateY(-5px)",
  },
  {
    id: "terminal-arcade",
    label: "Terminal Arcade",
    subtitle: "CRT matrix vibe with sharp UI",
    pageBackground: "linear-gradient(165deg, #020807 0%, #041611 100%)",
    pagePattern:
      "repeating-linear-gradient(to bottom, rgba(34,197,94,0.08) 0 1px, transparent 1px 4px), radial-gradient(circle, rgba(74,222,128,0.1) 1px, transparent 1px)",
    headerBadgeBg: "rgba(34,197,94,0.16)",
    headerBadgeBorder: "rgba(34,197,94,0.55)",
    headerBadgeText: "#86efac",
    headingColor: "#dcfce7",
    subheadingColor: "#86efac",
    panelBg: "rgba(3, 18, 12, 0.9)",
    panelBorder: "rgba(74,222,128,0.35)",
    panelRadius: "0px",
    inputBg: "rgba(1, 12, 8, 0.92)",
    inputText: "#bbf7d0",
    mutedText: "#4ade80",
    quizCardBg: "linear-gradient(180deg, rgba(1,20,12,0.95), rgba(2,30,18,0.9))",
    quizCardBorder: "rgba(74,222,128,0.45)",
    quizCardRadius: "0px",
    quizTitleColor: "#d1fae5",
    quizDescriptionColor: "#86efac",
    categoryChipBg: "rgba(74,222,128,0.1)",
    categoryChipBorder: "rgba(74,222,128,0.3)",
    categoryChipText: "#bbf7d0",
    shadow: "0 0 0 1px rgba(74,222,128,0.2), 0 20px 40px rgba(0,0,0,0.5)",
    cardHoverLift: "translateY(-4px)",
  },
];

const difficultyColors: Record<string, { bg: string; text: string; border: string }> = {
  beginner: { bg: "rgba(74, 222, 128, 0.12)", text: "#4ade80", border: "rgba(74, 222, 128, 0.35)" },
  intermediate: { bg: "rgba(250, 204, 21, 0.12)", text: "#facc15", border: "rgba(250, 204, 21, 0.35)" },
  expert: { bg: "rgba(248, 113, 113, 0.12)", text: "#f87171", border: "rgba(248, 113, 113, 0.35)" },
  extreme: { bg: "rgba(192, 132, 252, 0.12)", text: "#c084fc", border: "rgba(192, 132, 252, 0.35)" },
  apocalypse: { bg: "rgba(251, 113, 133, 0.12)", text: "#fb7185", border: "rgba(251, 113, 133, 0.35)" },
};

const animeAccents: Record<string, string> = {
  "One Piece": "#E8472F",
  "Hunter x Hunter": "#4ade80",
  "Dragon Ball": "#f97316",
  "Dragon Ball Z": "#facc15",
};

export default function HomePage() {
  const animeList = getAnimeList();
  const difficultyList = getDifficultyList();

  const [selectedAnime, setSelectedAnime] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [animeQuery, setAnimeQuery] = useState("");
  const [selectedDesignId, setSelectedDesignId] = useState<DesignId>("neon-grid");

  const selectedDesign = useMemo(
    () => designPresets.find((preset) => preset.id === selectedDesignId) || designPresets[0],
    [selectedDesignId]
  );

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      if (selectedAnime && q.anime !== selectedAnime) return false;
      if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedAnime, selectedDifficulty]);

  const filteredAnimeList = useMemo(() => {
    const query = animeQuery.trim().toLowerCase();
    if (!query) return animeList;
    return animeList.filter((anime) => anime.toLowerCase().includes(query));
  }, [animeList, animeQuery]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: selectedDesign.pageBackground,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: selectedDesign.pagePattern,
          backgroundSize: "22px 22px, 44px 44px, 44px 44px",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <header
          style={{
            borderBottom: `1px solid ${selectedDesign.panelBorder}`,
            padding: "32px 24px 28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: selectedDesign.headerBadgeBg,
              border: `1px solid ${selectedDesign.headerBadgeBorder}`,
              borderRadius: "6px",
              padding: "5px 14px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "3px",
              color: selectedDesign.headerBadgeText,
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
              color: selectedDesign.headingColor,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: "8px",
            }}
          >
            Anime Quizzes
          </h1>
          <p style={{ color: selectedDesign.subheadingColor, fontSize: "15px", maxWidth: "540px", margin: "0 auto" }}>
            Pick from 5 fully different visual styles, then choose a quiz and test your knowledge.
          </p>
        </header>

        <div
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            padding: "24px 24px 0",
          }}
        >
          <div
            style={{
              border: `1px solid ${selectedDesign.panelBorder}`,
              background: selectedDesign.panelBg,
              borderRadius: selectedDesign.panelRadius,
              boxShadow: selectedDesign.shadow,
              padding: "14px",
              marginBottom: "14px",
            }}
          >
            <div style={{ color: selectedDesign.mutedText, fontSize: "12px", marginBottom: "6px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
              Design picker
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {designPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedDesignId(preset.id)}
                  style={{
                    border: `1px solid ${selectedDesignId === preset.id ? selectedDesign.headerBadgeBorder : selectedDesign.panelBorder}`,
                    background: selectedDesignId === preset.id ? selectedDesign.headerBadgeBg : selectedDesign.inputBg,
                    color: selectedDesignId === preset.id ? selectedDesign.headerBadgeText : selectedDesign.inputText,
                    borderRadius: selectedDesign.panelRadius,
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.3px",
                  }}
                  title={preset.subtitle}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "8px", color: selectedDesign.subheadingColor, fontSize: "12px" }}>{selectedDesign.subtitle}</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "14px",
            }}
          >
            <div
              style={{
                border: `1px solid ${selectedDesign.panelBorder}`,
                borderRadius: selectedDesign.panelRadius,
                padding: "12px",
                background: selectedDesign.panelBg,
              }}
            >
              <div style={{ color: selectedDesign.mutedText, fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                Anime
              </div>
              <input
                type="text"
                value={animeQuery}
                onChange={(e) => setAnimeQuery(e.target.value)}
                placeholder="Search anime..."
                style={{
                  width: "100%",
                  marginBottom: "8px",
                  padding: "8px 10px",
                  borderRadius: selectedDesign.panelRadius,
                  border: `1px solid ${selectedDesign.panelBorder}`,
                  background: selectedDesign.inputBg,
                  color: selectedDesign.inputText,
                  fontSize: "13px",
                }}
              />
              <select
                value={selectedAnime ?? ""}
                onChange={(e) => setSelectedAnime(e.target.value || null)}
                style={{
                  width: "100%",
                  padding: "9px 10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  borderRadius: selectedDesign.panelRadius,
                  border: `1px solid ${selectedDesign.panelBorder}`,
                  background: selectedDesign.inputBg,
                  color: selectedAnime ? animeAccents[selectedAnime] || selectedDesign.inputText : selectedDesign.inputText,
                  cursor: "pointer",
                }}
              >
                <option value="">All anime</option>
                {filteredAnimeList.map((anime) => (
                  <option key={anime} value={anime}>
                    {anime}
                  </option>
                ))}
              </select>
              <div style={{ marginTop: "8px", color: selectedDesign.mutedText, fontSize: "11px" }}>
                Showing {filteredAnimeList.length} of {animeList.length}
              </div>
            </div>

            <div
              style={{
                border: `1px solid ${selectedDesign.panelBorder}`,
                borderRadius: selectedDesign.panelRadius,
                padding: "12px",
                background: selectedDesign.panelBg,
              }}
            >
              <div style={{ color: selectedDesign.mutedText, fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                Difficulty
              </div>
              <select
                value={selectedDifficulty ?? ""}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                style={{
                  width: "100%",
                  padding: "9px 10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  borderRadius: selectedDesign.panelRadius,
                  border: `1px solid ${selectedDesign.panelBorder}`,
                  background: selectedDesign.inputBg,
                  color: selectedDifficulty ? difficultyColors[selectedDifficulty]?.text || selectedDesign.inputText : selectedDesign.inputText,
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
              >
                <option value="">All difficulties</option>
                {difficultyList.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                onClick={() => {
                  setSelectedAnime(null);
                  setSelectedDifficulty(null);
                  setAnimeQuery("");
                }}
                disabled={!selectedAnime && !selectedDifficulty && !animeQuery}
                style={{
                  padding: "9px 14px",
                  fontSize: "13px",
                  fontWeight: 700,
                  borderRadius: selectedDesign.panelRadius,
                  border: `1px solid ${selectedDesign.panelBorder}`,
                  background: selectedDesign.panelBg,
                  color: selectedDesign.inputText,
                  cursor: "pointer",
                  opacity: !selectedAnime && !selectedDifficulty && !animeQuery ? 0.5 : 1,
                }}
              >
                Reset filters
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            padding: "28px 24px 60px",
          }}
        >
          <div style={{ color: selectedDesign.mutedText, fontSize: "13px", marginBottom: "20px" }}>
            {filteredQuizzes.length} {filteredQuizzes.length === 1 ? "quiz" : "quizzes"} available
          </div>

          {filteredQuizzes.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: selectedDesign.mutedText,
                fontSize: "15px",
              }}
            >
              No quizzes match your filters. Try adjusting your selection.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredQuizzes.map((quiz) => {
                const dc = difficultyColors[quiz.difficulty] || difficultyColors.beginner;
                const accent = animeAccents[quiz.anime] || selectedDesign.headerBadgeText;

                return (
                  <Link
                    key={quiz.slug}
                    href={`/quiz/${quiz.slug}`}
                    className="quiz-card"
                    style={{
                      textDecoration: "none",
                      background: selectedDesign.quizCardBg,
                      border: `1px solid ${selectedDesign.quizCardBorder}`,
                      borderRadius: selectedDesign.quizCardRadius,
                      padding: "24px",
                      display: "block",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: selectedDesign.shadow,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${accent}99`;
                      e.currentTarget.style.transform = selectedDesign.cardHoverLift;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = selectedDesign.quizCardBorder;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: `linear-gradient(to right, ${accent}, transparent)`,
                        opacity: 0.75,
                      }}
                    />

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                      <span
                        style={{
                          background: dc.bg,
                          color: dc.text,
                          border: `1px solid ${dc.border}`,
                          padding: "3px 10px",
                          borderRadius: "999px",
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
                          color: selectedDesign.mutedText,
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {quiz.questionCount} questions
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: selectedDesign.quizTitleColor,
                        marginBottom: "6px",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {quiz.title}
                    </h2>

                    <div
                      style={{
                        color: accent,
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        marginBottom: "12px",
                      }}
                    >
                      {quiz.anime}
                    </div>

                    <p style={{ color: selectedDesign.quizDescriptionColor, fontSize: "14px", marginBottom: "16px", lineHeight: 1.5 }}>
                      {quiz.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {quiz.categories.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          style={{
                            background: selectedDesign.categoryChipBg,
                            border: `1px solid ${selectedDesign.categoryChipBorder}`,
                            borderRadius: "999px",
                            padding: "2px 8px",
                            fontSize: "11px",
                            color: selectedDesign.categoryChipText,
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                      {quiz.categories.length > 4 && (
                        <span style={{ fontSize: "11px", color: selectedDesign.mutedText }}>
                          +{quiz.categories.length - 4} more
                        </span>
                      )}
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
