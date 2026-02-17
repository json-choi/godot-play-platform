import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2024 Godot Play Platform. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            홈
          </Link>
          <Link
            href="/games"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            게임
          </Link>
          <Link
            href="/upload"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            업로드
          </Link>
        </nav>
      </div>
    </footer>
  );
}
