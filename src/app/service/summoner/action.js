import { FETCH_SUMMONER_REQUEST } from './reducer'

export function getSummonerInfo(summonerName) {
  return {
    type: FETCH_SUMMONER_REQUEST,
    summonerName,
  }
}
