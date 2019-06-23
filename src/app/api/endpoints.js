import customAxios from './config'

/* -------------- SUMMONER -------------- */

export function getSummonerByName(name) {
  return customAxios.get(`/lol/summoner/v4/summoners/by-name/${name}`)
}
