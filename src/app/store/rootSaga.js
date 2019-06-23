import { fork, all } from 'redux-saga/effects'
import summonerSaga from 'app/service/summoner/saga'

export default function* rootSaga() {
  yield all([fork(summonerSaga)])
}
