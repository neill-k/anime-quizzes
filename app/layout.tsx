import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anime Quizzes",
  description: "Test your anime knowledge with themed trivia quizzes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
