import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import summonerState from 'app/service/summoner/reducer'
import loaderState from 'app/service/loader/reducer'
import { reducer as formReducer } from 'redux-form'

export default history => combineReducers({
  form: formReducer,
  summonerState,
  loaderState,
  router: connectRouter(history),
})
