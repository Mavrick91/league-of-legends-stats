import { createSelector } from 'reselect'

export const isEntityFetching = createSelector(
  state => state,
  (_, entity) => entity,
  (state, entity) => (state.entities[entity] || {}).isFetching !== false,
)

export const hasEntityError = createSelector(
  state => state,
  (_, arg) => arg,
  (state, entity) => (state.entities[entity] || {}).error || null,
)
