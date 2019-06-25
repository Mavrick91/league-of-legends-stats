import createReducer from 'app/utils/createReducer'

// 1 = loading / 0 = completed / -1 = error
export const UPDATE_LOADER = 'UPDATE_LOADER'

const HANDLERS = {
  [UPDATE_LOADER]: (state, { requestName, statusResponseRequest }) => ({
    ...state,
    [requestName]: statusResponseRequest,
  }),
}

export default createReducer({}, HANDLERS)
