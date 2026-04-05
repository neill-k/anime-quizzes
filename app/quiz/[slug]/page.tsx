import { notFound } from "next/navigation";
import { quizzes, getQuizBySlug } from "@/data/quizzes";
import QuizPlayer from "@/components/QuizPlayer";

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return quizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return { title: "Quiz Not Found" };
  return {
    title: `${quiz.title} | Anime Quizzes`,
    description: quiz.description,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) notFound();
  return <QuizPlayer quiz={quiz} />;
}
