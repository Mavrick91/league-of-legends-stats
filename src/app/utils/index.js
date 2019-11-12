// @flow

export function getParticipantsById(
  matchDetail: MatchDetailType,
  myParticipantId: number,
): ParticipantsType {
  return (Object.values(matchDetail.participants): any).find(
    participant => participant.participantId === myParticipantId,
  )
}

export function getMyParticipantIdentities(
  matchDetail: MatchDetailType,
  summonerId: string,
): ParticipantIdentitiesType {
  return (Object.values(matchDetail.participantIdentities): any).find(
    participant => participant.player.summonerId === summonerId,
  )
}

export function getTeamEnemyTotalDeath(matchDetail: MatchDetailType, myTeamId: number): number {
  return (Object.values(matchDetail.participants): any).reduce((acc, key) => {
    if (key.teamId === myTeamId) return acc

    return acc + key.stats.deaths
  }, 0)
}
