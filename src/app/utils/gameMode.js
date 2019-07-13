export function getGameMode(gameMode) {
  if (gameMode === 'CLASSIC') return 'Match classé'
  return gameMode.replace('games', '')
}
