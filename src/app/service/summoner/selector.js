// @flow

import { createSelector } from 'reselect'

const getSummonerEntity = state => state.entities.summoner

export const getSummonerEntitySelector = createSelector(
  getSummonerEntity,
  summoner => summoner,
)

export const getLeagueSelector = createSelector(
  getSummonerEntity,
  summoner => {
    if (!summoner) return null
    return summoner.league
  },
)

export const getSoloFlexRanked = createSelector(
  getSummonerEntity,
  (_, arg) => arg,
  (summoner, queueType) => {
    if (!summoner) return null

    return (Object.values(summoner.myleague): any).find(
      value => value && value.queueType === queueType,
    )
  },
)
