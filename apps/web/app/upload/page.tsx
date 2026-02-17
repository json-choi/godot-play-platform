"use client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UploadForm } from "@/components/upload/upload-form";

export default function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">게임 업로드</h1>
        <UploadForm />
      </main>
      <Footer />
    </div>
  );
}
