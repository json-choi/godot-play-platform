"use client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold mb-4">인기 게임</h1>
        <p className="text-muted-foreground">
          Godot Play Platform에 오신 것을 환영합니다!
        </p>
      </main>
      <Footer />
    </div>
  );
}
