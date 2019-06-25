import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import summonerState from 'app/service/summoner/reducer'
import { reducer as formReducer } from 'redux-form'

export default history => combineReducers({
  form: formReducer,
  summonerState,
  router: connectRouter(history),
})
