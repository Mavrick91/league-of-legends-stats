import { createSelector } from 'reselect'

const getMatches = state => state.entities.match

export const getMatchDetailsSelector = createSelector(
  getMatches,
  matches =>
    Object.values(matches || {})
      .filter(value => typeof value === 'object')
      .filter(Boolean),
)
