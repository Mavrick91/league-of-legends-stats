import customAxios, { CHAMPION_VERSION, ITEM_VERSION, SUMMONER_VERSION } from './config'

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

export function getAllChampions() {
  return customAxios.get(`/cdn/${CHAMPION_VERSION}/data/en_US/champion.json`)
}

export function getSummonerSpells() {
  return customAxios.get(`/cdn/${SUMMONER_VERSION}/data/en_US/summoner.json `)
}

export function getItems() {
  return customAxios.get(`/cdn/${ITEM_VERSION}/data/en_US/item.json `)
}

export function getMatchList(encryptedAccountId, params) {
  return customAxios.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}`, params)
}

export function getMatchById(matchId) {
  return customAxios.get(`/lol/match/v4/matches/${matchId}`)
}

export function getChampionsMasteries(encryptedSummonerId) {
  return customAxios.get(`/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`)
}
