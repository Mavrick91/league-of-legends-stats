declare type SummonerType = {
  info: SummonerInfoType,
  myLeague: SummonerMyLeagueType,
  league: SummonerLeagueType,
}

declare type SummonerInfoType = {
  id: string,
  accountId: string,
  puuid: string,
  name: string,
  profileIconId: number,
  revisionDate: number,
  summonerLevel: number,
}

declare type SummonerMyLeagueType = Array<{
  leagueId: string,
  queueType: string,
  tier: string,
  rank: string,
  summonerId: string,
  summonerName: string,
  leaguePoints: number,
  wins: number,
  losses: number,
  veteran: boolean,
  inactive: boolean,
  freshBlood: boolean,
  hotStreak: boolean,
}>

declare type SummonerLeagueType = {
  tier: string,
  leagueId: string,
  queue: string,
  name: string,
  entries: Array<{
    summonerId: string,
    summonerName: string,
    leaguePoints: number,
    rank: string,
    wins: number,
    losses: number,
    veteran: boolean,
    inactive: boolean,
    freshBlood: boolean,
    hotStreak: boolean,
  }>,
}

declare type SoloFlexRanked = {
  leagueId: string,
  queueType: string,
  tier: string,
  rank: string,
  summonerId: string,
  summonerName: string,
  leaguePoints: number,
  wins: number,
  losses: number,
  veteran: boolean,
  inactive: boolean,
  freshBlood: boolean,
  hotStreak: boolean,
}
