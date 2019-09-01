import customAxios from './config'

/* -------------- SUMMONER -------------- */

export function getSummonerByName(name) {
  return customAxios.get(`/lol/summoner/v4/summoners/by-name/${name}`)
}

export function getSummonerLeague(encryptedSummonerId) {
  return customAxios.get(`/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`)
}

export function getSummonerLeagueName(leagueId) {
  return customAxios.get(`/lol/league/v4/leagues/${leagueId}`)
}

export function getAllChampions(championVersion) {
  return customAxios.get(`/cdn/${championVersion}/data/en_US/champion.json`)
}

export function getSummonerSpells(summonerVersion) {
  return customAxios.get(`/cdn/${summonerVersion}/data/en_US/summoner.json `)
}

export function getItems(itemVersion) {
  return customAxios.get(`/cdn/${itemVersion}/data/en_US/item.json `)
}

export function getMatchList(encryptedAccountId, params) {
  return customAxios.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}`, params)
}

export function getMatchById(matchId) {
  return customAxios.get(`/lol/match/v4/matches/${matchId}`)
}

export function getChampionsMasteries(encryptedSummonerId) {
  return customAxios.get(
    `/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`,
  )
}

export function getVersions() {
  return customAxios.get('/realms/euw.json')
}
