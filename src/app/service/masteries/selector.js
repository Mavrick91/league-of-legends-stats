import { getChampionById } from 'app/service/staticData/selector'
import { createSelector } from 'reselect'

const getChampionsMasteries = state => state.entities.masteries || {}

export const getChampionsMasteriesSelector = createSelector(
  getChampionsMasteries,
  state => state,
  (championsMasteries, state) =>
    Object.values(championsMasteries)
      .filter(value => typeof value === 'object')
      .filter(Boolean)
      .map(item => {
        const champion = getChampionById(state, item.championId)
        return {
          ...item,
          name: champion.name,
        }
      }),
)
