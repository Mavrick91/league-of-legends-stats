export function getGameMode(gameMode) {
  if (gameMode === 'CLASSIC') return 'Ranked match'
  return gameMode.replace('games', '')
}
