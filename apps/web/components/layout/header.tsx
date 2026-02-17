"use client";

import Link from "next/link";
import { Moon, Sun, Gamepad2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Gamepad2 className="h-6 w-6" />
          <span className="font-bold text-xl">Godot Play</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            홈
          </Link>
          <Link
            href="/games"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            게임
          </Link>
          <Link
            href="/upload"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            업로드
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">테마 전환</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                라이트
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                다크
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                시스템
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
