"use client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function GamesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold mb-4">모든 게임</h1>
        <p className="text-muted-foreground">
          곧 게임 목록이 표시됩니다.
        </p>
      </main>
      <Footer />
    </div>
  );
}
