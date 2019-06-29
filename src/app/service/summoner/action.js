import { FETCH_SUMMONER_REQUEST } from './reducer'

export function getSummonerId(summonerName) {
  return {
    type: FETCH_SUMMONER_REQUEST,
    summonerName,
  }
}
