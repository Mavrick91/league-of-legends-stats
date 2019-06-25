import { combineReducers } from 'redux'
import summonerState from 'app/service/summoner/reducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  form: formReducer,
  summonerState,
})
