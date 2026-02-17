export interface Game {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string | null;
  pckUrl: string;
  pckSize: number;
  screenshots: string[];
  tags: string[];
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GameListItem {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string | null;
  pckSize: number;
  tags: string[];
  downloadCount: number;
  createdAt: string;
}

export interface GameListResponse {
  games: GameListItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export type GameSortOption = "latest" | "popular";
