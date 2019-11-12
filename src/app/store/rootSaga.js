import masteriesSaga from 'app/service/masteries/saga'
import matchesSaga from 'app/service/matches/saga'
import staticDataSaga from 'app/service/staticData/saga'
import summonerSaga from 'app/service/summoner/saga'
import { all, fork } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([fork(summonerSaga), fork(matchesSaga), fork(masteriesSaga), fork(staticDataSaga)])
}
