import { fork, all } from 'redux-saga/effects'
import genericSaga from './saga'

export default function* rootSaga() {
  yield all([fork(genericSaga)])
}
