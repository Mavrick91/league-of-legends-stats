import { createSelector } from 'reselect'

const getChampionsMasteries = state => state.entities.masteries || {}

export const getChampionsMasteriesSelector = createSelector(
  getChampionsMasteries,
  championsMasteries =>
    Object.values(championsMasteries)
      .filter(value => typeof value === 'object')
      .filter(Boolean),
)
