import { createSelector } from 'reselect'

const getSummoner = state => state.entities.summoner
const getMyleague = state => state.entities.myleague
const getLeague = state => state.entities.league

export const getSummonerSelector = createSelector(
  getSummoner,
  summoner => summoner || {},
)

export const getMyleagueSelector = createSelector(
  getMyleague,
  myleague => myleague || {},
)

export const getLeagueSelector = createSelector(
  getLeague,
  league => league || {},
)

export const isEntityFetching = createSelector(
  state => state,
  state =>
    Object.values(state.entities).some(value => value.isFetching === true),
)

export const hasEntityError = createSelector(
  state => state,
  state => {
    const entity = Object.keys(state.entities).filter(value => value)[0]

    if (!entity) return null

    return state.entities[entity].error
  },
)

export const getSoloFlexRanked = createSelector(
  getMyleague,
  (_, arg) => arg,
  (myleague, queueType) => {
    if (!myleague) return {}

    return (
      Object.values(myleague).find(
        value => value && value.queueType === queueType,
      ) || {}
    )
  },
)
