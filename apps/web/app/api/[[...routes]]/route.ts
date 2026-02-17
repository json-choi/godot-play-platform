import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const gamesStore = new Map<string, any>();

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

  const allGames = Array.from(gamesStore.values());
  const sorted = allGames.sort((a, b) => {
    if (sort === "popular") return b.downloadCount - a.downloadCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const start = (page - 1) * limit;
  const games = sorted.slice(start, start + limit);

  return c.json({
    games,
    total: allGames.length,
    page,
    limit,
    hasMore: start + limit < allGames.length,
  });
});

// 게임 상세
app.get("/games/:id", async (c) => {
  const id = c.req.param("id");
  const game = gamesStore.get(id);

  if (!game) {
    return c.json(
      {
        error: {
          code: "GAME_NOT_FOUND",
          message: "Game not found",
        },
      },
      404
    );
  }

  return c.json(game);
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

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  // Vercel Blob에 PCK 파일 업로드
  const pckBlob = await put(`games/${id}/${pckFile.name}`, pckFile, {
    access: "public",
  });

  // 썸네일 업로드 (있으면)
  let thumbnailUrl = null;
  const thumbnailFile = body["thumbnail"] as File | undefined;
  if (thumbnailFile) {
    const thumbnailBlob = await put(`games/${id}/thumbnail`, thumbnailFile, {
      access: "public",
    });
    thumbnailUrl = thumbnailBlob.url;
  }

  const game = {
    id,
    name,
    description: description || "",
    pckUrl: pckBlob.url,
    pckSize: pckFile.size,
    thumbnailUrl,
    screenshots: [],
    tags: tags || [],
    downloadCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  gamesStore.set(id, game);

  return c.json(game, 201);
});

// PCK 다운로드
app.get("/games/:id/download", async (c) => {
  const id = c.req.param("id");
  const game = gamesStore.get(id);

  if (!game) {
    return c.json(
      {
        error: {
          code: "GAME_NOT_FOUND",
          message: "Game not found",
        },
      },
      404
    );
  }

  game.downloadCount++;
  gamesStore.set(id, game);

  return c.redirect(game.pckUrl);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
