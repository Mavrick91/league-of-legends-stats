import createReducer from 'app/utils/createReducer'

export const FETCH_SUMMONER_REQUEST = 'FETCH_SUMMONER_REQUEST'
export const FETCH_SUMMONER_SUCCESSED = 'FETCH_SUMMONER_SUCCESSED'
export const FETCH_SUMMONER_FAILED = 'FETCH_SUMMONER_FAILED'

const HANDLERS = {
  [FETCH_SUMMONER_SUCCESSED]: (state, action) => ({ ...state, ...action.data }),
  [FETCH_SUMMONER_FAILED]: (state, action) => ({ error: action.message }),
}

export default createReducer({}, HANDLERS)
