import { set } from 'app/utils/object'

function entitiesReducer(state = {}, action) {
  const { type, payload, error, entityName } = action

  if (type.endsWith('REQUEST')) {
    return set({ ...state }, entityName.toLowerCase(), {
      isFetching: true,
      error: null,
    })
  }

  if (type.endsWith('SUCCESS')) {
    return set({ ...state }, entityName.toLowerCase(), {
      ...payload,
      isFetching: false,
      error: null,
    })
  }

  if (type.endsWith('FAILURE')) {
    return set({ ...state }, entityName.toLowerCase(), {
      error,
      isFetching: false,
    })
  }

  if (type.endsWith('RESET')) {
    return {
      ...state,
      [entityName]: null,
    }
  }

  return state
}

export default entitiesReducer
