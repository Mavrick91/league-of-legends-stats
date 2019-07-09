import customAxios from './config'

/* -------------- SUMMONER -------------- */

export function getSummonerByName(name) {
  return customAxios.get(`/lol/summoner/v4/summoners/by-name/${name}`)
}

export function getSummonerLeague(encryptedSummonerId) {
  return customAxios.get(
    `/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`,
  )
}

export function getSummonerLeagueName(leagueId) {
  return customAxios.get(`/lol/league/v4/leagues/${leagueId}`)
}
