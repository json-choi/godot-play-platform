import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

// Health check
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 게임 목록 쿼리 스키마
const listGamesQuery = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sort: z.enum(["latest", "popular"]).default("latest"),
});

// 게임 목록
app.get("/games", zValidator("query", listGamesQuery), async (c) => {
  const { page, limit, sort } = c.req.valid("query");
  // TODO: DB에서 조회 (MVP는 in-memory)
  return c.json({
    games: [],
    total: 0,
    page,
    limit,
    hasMore: false,
  });
});

// 게임 상세
app.get("/games/:id", async (c) => {
  const id = c.req.param("id");
  // TODO: DB에서 조회
  return c.json(
    {
      error: {
        code: "GAME_NOT_FOUND",
        message: "Game not found",
      },
    },
    404
  );
});

// 게임 업로드 스키마
const uploadGameSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(2000).optional(),
  tags: z.array(z.string().min(1).max(20)).max(10).optional(),
});

// 게임 업로드
app.post("/games", zValidator("form", uploadGameSchema), async (c) => {
  const { name, description, tags } = c.req.valid("form");
  const body = await c.req.parseBody();

  const pckFile = body["pck"] as File | undefined;
  if (!pckFile) {
    return c.json(
      {
        error: {
          code: "PCK_REQUIRED",
          message: "PCK file is required",
        },
      },
      400
    );
  }

  // TODO: Vercel Blob에 업로드
  // TODO: In-memory 저장소에 게임 정보 저장

  return c.json(
    {
      id: crypto.randomUUID(),
      name,
      description,
      pckUrl: "https://example.blob.vercel-storage.com/...",
    },
    201
  );
});

// PCK 다운로드
app.get("/games/:id/download", async (c) => {
  const id = c.req.param("id");
  // TODO: DB에서 PCK URL 조회 후 리다이렉트
  return c.redirect("https://example.blob.vercel-storage.com/...");
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
