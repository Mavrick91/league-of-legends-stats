import customAxios from './config'

/* -------------- SUMMONER -------------- */

export function getSummonerByName(name) {
  return customAxios
    .get(`/lol/summoner/v4/summoners/by-name/${name}`)
    .then(response => ({ response }))
    .catch(() => ({ error: 'Summoner not found' }))
}

export function getSummonerLeague(encryptedSummonerId) {
  return customAxios
    .get(`/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`)
    .then(response => ({ response }))
    .catch(() => ({ error: 'Summoner\'s league not found' }))
}

export function getSummonerLeagueName(leagueId) {
  return customAxios
    .get(`/lol/league/v4/leagues/${leagueId}`)
    .then(response => ({ response }))
    .catch(() => ({ error: 'Summoner\'s league name not found' }))
}
