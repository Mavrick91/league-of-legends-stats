import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      sagaMiddleware,
    ),
  ),
)

sagaMiddleware.run(rootSaga)

export default store
