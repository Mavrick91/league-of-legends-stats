import { createSelector } from 'reselect'

const getMatches = state => state.entities.matches || {}

export const getMatchDetailsSelector = createSelector(
  getMatches,
  matches =>
    Object.values(matches.details || {})
      .filter(value => typeof value === 'object')
      .filter(Boolean),
)

export const getMatchListSelector = createSelector(
  getMatches,
  matches =>
    Object.values((matches.list || {}).matches || {})
      .filter(value => typeof value === 'object')
      .filter(Boolean),
)
