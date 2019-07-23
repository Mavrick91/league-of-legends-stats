import { fork, all } from 'redux-saga/effects'
import summonerSaga from 'app/service/summoner/saga'
import matchesSaga from 'app/service/matches/saga'

export default function* rootSaga() {
  yield all([fork(summonerSaga), fork(matchesSaga)])
}
