import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import entitiesReducer from './reducer'

export default history =>
  combineReducers({
    form: formReducer,
    entities: entitiesReducer,
    router: connectRouter(history),
  })
