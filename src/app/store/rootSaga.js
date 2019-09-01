import { fork, all } from 'redux-saga/effects'
import summonerSaga from 'app/service/summoner/saga'
import masteriesSaga from 'app/service/masteries/saga'
import matchesSaga from 'app/service/matches/saga'
import versionsSaga from 'app/service/versions/saga'

export default function* rootSaga() {
  yield all([fork(summonerSaga), fork(matchesSaga), fork(masteriesSaga), fork(versionsSaga)])
}
