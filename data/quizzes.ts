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
    slug: "beginner-one-piece",
    anime: "One Piece",
    title: "One Piece Trivia",
    difficulty: "beginner",
    description: "Test your nakama knowledge",
    questionCount: 12,
    categories: ["Combat", "Devil Fruits", "Bounties", "Crew", "Lore", "Navigation"],
    badgeLabel: "Grand Line Edition",
    startButtonText: "Set Sail",
    questions: [
      { q: "What is the name of Luffy's signature technique that stretches his arm for a powerful punch?", options: ["Gum-Gum Bazooka", "Gum-Gum Gatling", "Gum-Gum Pistol", "Gum-Gum Rocket"], answer: 2, category: "Combat" },
      { q: "Which Devil Fruit did Trafalgar Law eat, granting him the ability to create a 'Room' and manipulate everything within it?", options: ["Mera Mera no Mi", "Ope Ope no Mi", "Sube Sube no Mi", "Gura Gura no Mi"], answer: 1, category: "Devil Fruits" },
      { q: "What is the bounty on Monkey D. Luffy after the events of Dressrosa?", options: ["400,000,000 Berries", "500,000,000 Berries", "300,000,000 Berries", "600,000,000 Berries"], answer: 1, category: "Bounties" },
      { q: "Who is known as the 'Pirate Hunter' and is one of the first members to join the Straw Hat crew?", options: ["Sanji", "Roronoa Zoro", "Franky", "Usopp"], answer: 1, category: "Crew" },
      { q: "What island is the final destination believed to contain the One Piece treasure?", options: ["Marineford", "Raftel", "Laugh Tale", "Skypiea"], answer: 2, category: "Lore" },
      { q: "Which of the Four Emperors is known as 'Whitebeard' and was considered the 'Strongest Man in the World'?", options: ["Kaido", "Big Mom", "Shanks", "Edward Newgate"], answer: 3, category: "Emperors" },
      { q: "What color is Zoro's bandana that he ties around his head before a serious fight?", options: ["Red", "White", "Black", "Blue"], answer: 2, category: "Crew" },
      { q: "What is the name of Nami's weapon/tool that she uses to manipulate weather in battle?", options: ["Thunder Bolt", "Clima-Tact", "Weather Rod", "Storm Staff"], answer: 1, category: "Crew" },
      { q: "Which organization does Nico Robin originally belong to before joining the Straw Hats?", options: ["CP9", "Revolutionary Army", "Baroque Works", "Warlords of the Sea"], answer: 2, category: "Lore" },
      { q: "What is the name of the ancient weapon that Shirahoshi is revealed to be?", options: ["Pluton", "Uranus", "Poseidon", "Neptune"], answer: 2, category: "Lore" },
      { q: "Which sea did the Straw Hats start their journey in before entering the Grand Line?", options: ["North Blue", "South Blue", "West Blue", "East Blue"], answer: 3, category: "Navigation" },
      { q: "What is Sanji's home country, ruled by his family the Vinsmokes?", options: ["Germa Kingdom", "Dressrosa", "Alabasta", "Wano Country"], answer: 0, category: "Crew" },
    ],
    ranks: [
      { title: "Pirate King", desc: "You sail where no one else dares.", minPct: 90, color: "#FFD700" },
      { title: "Yonko Crew", desc: "A fearsome sailor worthy of legend.", minPct: 70, color: "#E8472F" },
      { title: "Supernova", desc: "A rising star on the Grand Line.", minPct: 50, color: "#5B8DD9" },
      { title: "Rookie Pirate", desc: "Your journey has barely begun.", minPct: 30, color: "#8B9AB8" },
      { title: "East Blue Landlubber", desc: "The sea has many lessons for you.", minPct: 0, color: "#708090" },
    ],
    theme: {
      bg: "linear-gradient(160deg, #0a1628 0%, #0e2240 40%, #071525 100%)",
      cardBg: "linear-gradient(145deg, #12233d, #0d1e36)",
      accent: "#C8A03C",
      accentSecondary: "#E8C96A",
      accentDim: "rgba(200,160,60,0.1)",
      borderColor: "rgba(200,160,60,0.25)",
      textPrimary: "#F5E6B8",
      textSecondary: "#5B7AA3",
      font: "'Georgia', serif",
    },
  },
  {
    slug: "intermediate-one-piece",
    anime: "One Piece",
    title: "One Piece Grand Line Challenge",
    difficulty: "intermediate",
    description: "A voyage for seasoned pirates",
    questionCount: 12,
    categories: ["Crew", "World", "Devil Fruits", "History", "Haki", "Allies"],
    badgeLabel: "Paradise Route",
    startButtonText: "Chart Course",
    questions: [
      { q: "Who entrusted Luffy with the Straw Hat that once belonged to Gol D. Roger?", options: ["Silvers Rayleigh", "Shanks", "Monkey D. Dragon", "Edward Newgate"], answer: 1, category: "History" },
      { q: "What is the name of the sea train that connected Water 7 to Enies Lobby?", options: ["Ocean Rocket", "Puffing Tom", "Aqua Liner", "Wave Rider"], answer: 1, category: "World" },
      { q: "Which CP9 agent uses the Cat-Cat Fruit, Model: Leopard?", options: ["Kaku", "Blueno", "Rob Lucci", "Jabra"], answer: 2, category: "Devil Fruits" },
      { q: "Who is Usopp's father and a sniper of the Red Hair Pirates?", options: ["Benn Beckman", "Lucky Roux", "Yasopp", "Rockstar"], answer: 2, category: "Crew" },
      { q: "Which Warlord of the Sea was the first to be defeated by Luffy?", options: ["Donquixote Doflamingo", "Crocodile", "Gecko Moria", "Bartholomew Kuma"], answer: 1, category: "History" },
      { q: "What Devil Fruit did Tony Tony Chopper eat?", options: ["Hito Hito no Mi", "Neko Neko no Mi", "Inu Inu no Mi", "Mushi Mushi no Mi"], answer: 0, category: "Devil Fruits" },
      { q: "Who trained Luffy in Haki during the two-year timeskip?", options: ["Shanks", "Dracule Mihawk", "Silvers Rayleigh", "Monkey D. Garp"], answer: 2, category: "Haki" },
      { q: "What is Franky's birth name before he became known by his current alias?", options: ["Cutty Flam", "Iceburg", "Tom Junior", "Franklin"], answer: 0, category: "Crew" },
      { q: "At Sabaody, what is used to coat ships so they can travel underwater to Fish-Man Island?", options: ["Seastone plating", "Mangrove resin coating", "Dials", "Kairoseki bubbles"], answer: 1, category: "World" },
      { q: "What epithet is Nico Robin known by?", options: ["Black Leg", "Cat Burglar", "Devil Child", "Soul King"], answer: 2, category: "Crew" },
      { q: "Which Mink ruler joined the Nine Red Scabbards and traveled with Oden to Laugh Tale?", options: ["Nekomamushi", "Pedro", "Carrot", "Wanda"], answer: 0, category: "Allies" },
      { q: "What is the name of the giant elephant that carries Zou on its back?", options: ["Surume", "Laboon", "Zunesha", "MooMoo"], answer: 2, category: "World" },
    ],
    ranks: [
      { title: "Right-Hand of the Captain", desc: "Reliable, fearless, and ready for the New World.", minPct: 90, color: "#FFD700" },
      { title: "Grand Line Veteran", desc: "You can handle rough seas and rougher opponents.", minPct: 75, color: "#E8472F" },
      { title: "Skilled Navigator", desc: "Your route is solid, but storms remain.", minPct: 50, color: "#D48B5B" },
      { title: "Paradise Rookie", desc: "You made it past Reverse Mountain, barely.", minPct: 30, color: "#B88B8B" },
      { title: "Cabin Boy", desc: "Time to study your logbook and set sail again.", minPct: 0, color: "#708090" },
    ],
    theme: {
      bg: "linear-gradient(160deg, #10243d 0%, #0a1830 40%, #060e1e 100%)",
      cardBg: "linear-gradient(145deg, #122944, #0b1a31)",
      accent: "#5B8DD9",
      accentSecondary: "#C8A03C",
      accentDim: "rgba(91,141,217,0.12)",
      borderColor: "rgba(200,160,60,0.3)",
      textPrimary: "#E6EEF8",
      textSecondary: "#93A8C3",
      font: "'Georgia', serif",
    },
  },
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
