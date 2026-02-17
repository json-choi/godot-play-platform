import { z } from "zod";

export const gameUploadSchema = z.object({
  name: z.string().min(1, "게임 이름을 입력해주세요").max(100, "게임 이름은 100자 이내로 입력해주세요"),
  description: z.string().max(2000, "설명은 2000자 이내로 입력해주세요").optional(),
  tags: z.array(z.string().min(1).max(20)).max(10).optional(),
});

export const gameListQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sort: z.enum(["latest", "popular"]).default("latest"),
});

export type GameUploadInput = z.infer<typeof gameUploadSchema>;
export type GameListQuery = z.infer<typeof gameListQuerySchema>;
