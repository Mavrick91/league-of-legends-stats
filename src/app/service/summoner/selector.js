import { pathOr } from 'ramda'
import { createSelector } from 'reselect'

const getSummoner = state => state.entities.summoner
const getMyleague = state => state.entities.myleague
const getLeague = state => state.entities.league
const getMatchLists = state => pathOr([], ['matchlists', 'matches'], state.entities)
const getMatches = state => state.entities.match
const getListChampions = state => state.entities.allchampions
const getSummonerSpells = state => state.entities.summonerspells

export const getSummonerSelector = createSelector(
  getSummoner,
  summoner => summoner || {},
)

export const getLeagueSelector = createSelector(
  getLeague,
  league => league || {},
)

export const getMatchListsSelector = createSelector(
  getMatchLists,
  matchLists => matchLists,
)

export const getMatchDetailsSelector = createSelector(
  getMatches,
  matches =>
    Object.values(matches || {})
      .filter(value => typeof value === 'object')
      .filter(Boolean),
)

export const getChampionById = createSelector(
  getListChampions,
  (_, championId) => championId,
  (listChampions, championId) =>
    Object.values(listChampions.data).find(champion => champion.key === championId.toString()),
)

export const getSummonerSpellsById = createSelector(
  getSummonerSpells,
  (_, summonerSpellId) => summonerSpellId,
  (listSummonerSpell, summonerSpellId) =>
    Object.values(listSummonerSpell.data).find(
      summonerSpell => summonerSpell.key === summonerSpellId.toString(),
    ),
)

export const isEntityFetching = createSelector(
  state => state,
  (_, entity) => entity,
  (state, entity) => {
    if (entity) return (state[entity] || {}).isFetching
    return Object.values(state.entities).some(value => value.isFetching === true)
  },
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

    return Object.values(myleague).find(value => value && value.queueType === queueType) || {}
  },
)
