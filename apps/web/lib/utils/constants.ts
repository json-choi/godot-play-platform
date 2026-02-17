export const LAUNCHER_SCHEME = "godot-launcher";

export function buildPlayDeeplink(gameId: string): string {
  return `${LAUNCHER_SCHEME}://play?id=${gameId}`;
}

export const MAX_PCK_SIZE = 500 * 1024 * 1024; // 500MB
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_SCREENSHOTS = 5;
export const MAX_TAGS = 10;
