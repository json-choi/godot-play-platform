export const LAUNCHER_SCHEME = "godot-launcher";

export function buildPlayDeeplink(gameId: string): string {
  return `${LAUNCHER_SCHEME}://play?id=${gameId}`;
}
