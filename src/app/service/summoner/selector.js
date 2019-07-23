import { createSelector } from 'reselect'

const getSummonerEntity = state => state.entities.summoner || {}
const getListChampions = state => state.entities.summoner.allchampions
const getSummonerSpells = state => state.entities.summoner.summonerspells

export const getSummonerEntitySelector = createSelector(
  getSummonerEntity,
  summoner => summoner || {},
)

export const getLeagueSelector = createSelector(
  getSummonerEntity,
  ({ league }) => league || {},
)

export const getAllChampionsSelector = createSelector(
  getListChampions,
  allChamps => allChamps,
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

export const getSoloFlexRanked = createSelector(
  getSummonerEntity,
  (_, arg) => arg,
  ({ myleague }, queueType) => {
    if (!myleague) return {}

    return Object.values(myleague).find(value => value && value.queueType === queueType) || {}
  },
)
