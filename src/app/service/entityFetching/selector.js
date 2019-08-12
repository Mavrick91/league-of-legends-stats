import { createSelector } from 'reselect'

export const isEntityFetching = createSelector(
  state => state,
  (_, entity) => entity,
  (state, entity) => (state.entities[entity] || {}).isFetching === true,
)
