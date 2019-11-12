import { createSelector } from 'reselect'

export const isEntityFetching = createSelector(
  state => state,
  (_, entity) => entity,
  (state, entity) => {
    if (
      !Object.prototype.hasOwnProperty.call(state.entities, entity) ||
      state.entities[entity] === null
    )
      return true
    return state.entities[entity].isFetching === true
  },
)
