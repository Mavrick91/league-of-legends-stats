import { createSelector } from 'reselect'

const getSummoner = state => state.summonerState

export const getSummonerSelector = createSelector(
  getSummoner,
  summoner => summoner,
)
