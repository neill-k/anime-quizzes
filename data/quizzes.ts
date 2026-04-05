export interface Question {
  q: string;
  options: string[];
  answer: number;
  category: string;
}

export interface QuizTheme {
  bg: string;
  cardBg: string;
  accent: string;
  accentSecondary: string;
  accentDim: string;
  borderColor: string;
  textPrimary: string;
  textSecondary: string;
  font: string;
}

export interface QuizRank {
  title: string;
  desc: string;
  minPct: number;
  color: string;
}

export interface Quiz {
  slug: string;
  anime: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "expert";
  description: string;
  questionCount: number;
  categories: string[];
  badgeLabel: string;
  startButtonText: string;
  questions: Question[];
  ranks: QuizRank[];
  theme: QuizTheme;
}

export const quizzes: Quiz[] = [
  {
    slug: "expert-one-piece",
    anime: "One Piece",
    title: "One Piece Expert Trivia",
    difficulty: "expert",
    description: "Only for true scholars of Ohara",
    questionCount: 12,
    categories: ["Deep Lore", "Cover Stories", "SBS Trivia", "Exact Bounties", "History", "Grand Fleet"],
    badgeLabel: "New World Edition",
    startButtonText: "Enter the New World",
    questions: [
      { q: "What is the exact final bounty of the Pirate King, Gol D. Roger?", options: ["5,046,000,000 Berries", "5,564,800,000 Berries", "4,388,000,000 Berries", "5,500,000,000 Berries"], answer: 1, category: "Bounties" },
      { q: "What is the name of the Celestial Dragon who shot Sabo's small fishing boat when he set sail as a child?", options: ["Saint Charlos", "Saint Rosward", "Saint Shalria", "Saint Jalmack"], answer: 3, category: "Lore" },
      { q: "Which commander led the 8th Division of the Whitebeard Pirates?", options: ["Namur", "Izo", "Haruta", "Rakuyo"], answer: 0, category: "Crew" },
      { q: "What was the name of the giant snake worshipped as a 'God' in Shandora 400 years ago?", options: ["Nola", "Yamata", "Kashigami", "Hebihime"], answer: 2, category: "Lore" },
      { q: "What is the name of the pirate captain who founded the Rumbar Pirates, Brook's former crew?", options: ["Fisher Tiger", "Calico Yorki", "Vander Decken", "John Giant"], answer: 1, category: "History" },
      { q: "According to Eiichiro Oda in an SBS, what real-world nationality would Nico Robin be?", options: ["French", "Egyptian", "Russian", "Indian"], answer: 2, category: "SBS Trivia" },
      { q: "Which of these characters ate the Jake Jake no Mi (Jacket-Jacket Fruit)?", options: ["Wapol", "Machvise", "Blamenco", "Kelly Funk"], answer: 3, category: "Devil Fruits" },
      { q: "In the Fish-Man Island arc, what rare blood type does Sanji possess that causes a medical crisis?", options: ["Type S (RH-)", "Type X", "Type F", "Type XF"], answer: 0, category: "Biology" },
      { q: "What is the name of the Supreme Grade Sword (Saijo O Wazamono) wielded by Dracule Mihawk?", options: ["Enma", "Yoru", "Shusui", "Ace"], answer: 1, category: "Weapons" },
      { q: "Who was the first person in the history of Impel Down to successfully escape from the prison?", options: ["Morley", "Monkey D. Luffy", "Shiki the Golden Lion", "Bartholomew Kuma"], answer: 2, category: "Lore" },
      { q: "What was the name of the legendary wood used to build both the Oro Jackson and the Thousand Sunny?", options: ["Sunlight Tree Eve", "Treasure Tree Adam", "Knowledge Tree of Ohara", "Whale Tree"], answer: 1, category: "Ships" },
      { q: "Who did Portgas D. Ace mistakenly attack during his cover story search for Blackbeard?", options: ["Brownbeard", "Peachbeard", "A random Marine", "Dr. Black Beard"], answer: 3, category: "Cover Stories" },
    ],
    ranks: [
      { title: "Joy Boy", desc: "You possess the Voice of All Things.", minPct: 90, color: "#FFD700" },
      { title: "Emperor of the Sea", desc: "A true ruler of the New World.", minPct: 75, color: "#E8472F" },
      { title: "Yonko Commander", desc: "A formidable threat to the World Government.", minPct: 50, color: "#D48B5B" },
      { title: "New World Rookie", desc: "The Grand Line broke your spirit.", minPct: 30, color: "#B88B8B" },
      { title: "Paradise Reject", desc: "You didn't even make it past Sabaody.", minPct: 0, color: "#708090" },
    ],
    theme: {
      bg: "linear-gradient(160deg, #2b0a0a 0%, #1a0505 40%, #0a0000 100%)",
      cardBg: "linear-gradient(145deg, #1f0b0b, #120505)",
      accent: "#E8472F",
      accentSecondary: "#FFD700",
      accentDim: "rgba(220,50,50,0.15)",
      borderColor: "rgba(220,160,60,0.3)",
      textPrimary: "#F5E6B8",
      textSecondary: "#b09090",
      font: "'Georgia', serif",
    },
  },
  {
    slug: "intermediate-hunter-x-hunter",
    anime: "Hunter x Hunter",
    title: "Hunter x Hunter Intermediate Exam",
    difficulty: "intermediate",
    description: "Test your Nen knowledge",
    questionCount: 12,
    categories: ["Nen Mechanics", "Greed Island", "Phantom Troupe", "Heavens Arena", "Chimera Ants"],
    badgeLabel: "Hunter Association",
    startButtonText: "Take the Exam",
    questions: [
      { q: "What number badge did Hisoka wear during the 287th Hunter Exam?", options: ["Badge #44", "Badge #99", "Badge #404", "Badge #87"], answer: 0, category: "Hunter Exam" },
      { q: "Based on the Water Divination test, what is Killua Zoldyck's natural Nen affinity?", options: ["Enhancer", "Conjurer", "Transmuter", "Specialist"], answer: 2, category: "Nen Mechanics" },
      { q: "Which of Kurapika's chains specifically forces the target into a state of Zetsu, making them unable to use Nen?", options: ["Judgment Chain", "Holy Chain", "Chain Jail", "Dowsing Chain"], answer: 2, category: "Nen Abilities" },
      { q: "In Greed Island, which spell card allows a player to fly to a city they have previously visited?", options: ["Accompany", "Magnetic Force", "Return", "Levitation"], answer: 1, category: "Greed Island" },
      { q: "What is the name of the massive, terrifying guard dog that protects the Zoldyck Family estate?", options: ["Mike", "Cerberus", "Fluffy", "Gotoh"], answer: 0, category: "Characters" },
      { q: "What is the name of the fictional board game that Meruem plays obsessively with Komugi?", options: ["Shogi", "Go", "Gungi", "Xiangqi"], answer: 2, category: "Chimera Ant" },
      { q: "What identifying tattoo do all official members of the Phantom Troupe have somewhere on their body?", options: ["A black scorpion", "A coiled snake", "A red dragon", "A twelve-legged spider"], answer: 3, category: "Phantom Troupe" },
      { q: "At what floor in the Heavens Arena are participants finally allowed to use weapons and fight without a point system?", options: ["Floor 100", "Floor 150", "Floor 200", "Floor 250"], answer: 2, category: "Heavens Arena" },
      { q: "Which of these Hunters was NEVER a member of the Zodiacs?", options: ["Ging Freecss", "Kite", "Cheadle Yorkshire", "Pariston Hill"], answer: 1, category: "Hunter Association" },
      { q: "During the Yorknew City arc, which mafia family does Neon (the girl with the fortune-telling ability) belong to?", options: ["The Ten Dons", "The Nostrade Family", "The Vinsmoke Family", "The Zoldyck Family"], answer: 1, category: "Yorknew City" },
      { q: "Who served as the 12th Chairman of the Hunter Association?", options: ["Pariston Hill", "Ging Freecss", "Isaac Netero", "Biscuit Krueger"], answer: 2, category: "Hunter Association" },
      { q: "Which of the Chimera Ant Royal Guards has a cat-like appearance and specializes in manipulation and healing?", options: ["Shaiapouf", "Menthuthuyoupi", "Colt", "Neferpitou"], answer: 3, category: "Chimera Ant" },
    ],
    ranks: [
      { title: "Triple-Star Hunter", desc: "A legend among the Association. Your Nen mastery is unmatched.", minPct: 90, color: "#4ade80" },
      { title: "Single-Star Hunter", desc: "An elite professional who has made historical contributions.", minPct: 75, color: "#2dd4bf" },
      { title: "Pro Hunter", desc: "You passed the Secret Exam. Welcome to the real world.", minPct: 50, color: "#60a5fa" },
      { title: "Heavens Arena Floor 100", desc: "You have potential, but you need to learn Nen.", minPct: 30, color: "#94a3b8" },
      { title: "Tonpa's Victim", desc: "You drank the juice. Better luck next year.", minPct: 0, color: "#64748b" },
    ],
    theme: {
      bg: "linear-gradient(160deg, #091a10 0%, #102619 40%, #06120b 100%)",
      cardBg: "linear-gradient(145deg, #132b1e, #0c1a12)",
      accent: "#4ade80",
      accentSecondary: "#2dd4bf",
      accentDim: "rgba(74, 222, 128, 0.1)",
      borderColor: "rgba(74, 222, 128, 0.2)",
      textPrimary: "#f8fafc",
      textSecondary: "#94a3b8",
      font: "system-ui, -apple-system, sans-serif",
    },
  },
];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}

export function getAnimeList(): string[] {
  return [...new Set(quizzes.map((q) => q.anime))];
}

export function getDifficultyList(): string[] {
  return [...new Set(quizzes.map((q) => q.difficulty))];
}
