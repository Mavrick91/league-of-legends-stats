// @flow

import { createSelector } from 'reselect'

const getVersions = state => state.entities.static_data.versions
const getAllChampions = state => state.entities.static_data.allChampions
const getSummonerSpells = state => state.entities.static_data.summonerSpells
const getItems = state => state.entities.static_data.items

export const getVersionsSelector = createSelector(
  getVersions,
  versions => versions,
)

export const getAllChampionsSelector = createSelector(
  getAllChampions,
  allChampions => allChampions,
)

export const getChampionById = createSelector(
  getAllChampionsSelector,
  (_, championId) => championId,
  (allChampions, championId) =>
    (Object.values(allChampions): any).find(champion => champion.key === championId.toString()),
)

export const getSummonerSpellsSelector = createSelector(
  getSummonerSpells,
  summonerSpells => summonerSpells,
)

export const getSummonerSpellsById = createSelector(
  getSummonerSpellsSelector,
  (_, summonerSpellId) => summonerSpellId,
  (summonerSpells, summonerSpellId) =>
    (Object.values(summonerSpells): any).find(
      summonerSpell => summonerSpell.key === summonerSpellId.toString(),
    ),
)

export const getItemsSelector = createSelector(
  getItems,
  items => items,
)
