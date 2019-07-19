import { createSelector } from 'reselect'
import { isEmpty } from 'ramda'

export const isEntityFetching = createSelector(
  state => state,
  (_, entity) => entity,
  (state, entity) => (state.entities[entity] || {}).isFetching !== false,
)

export const hasEntityError = createSelector(
  state => state,
  (_, arg) => arg,
  (state, entity) => {
    const result = Object.values(state.entities[entity] || []).filter(value => {
      if (isEmpty(value)) return null

      return (value || {}).error
    })
    if (isEmpty(result)) return null

    return state.entities[entity].error
  },
)
