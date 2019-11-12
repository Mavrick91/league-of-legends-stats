import * as Api from 'app/api/endpoints'
import { fetchEndpoint } from 'app/store/saga'
import { call, put, takeEvery } from 'redux-saga/effects'

export function* fetchSummoner({ entityName, payload }) {
  const { summonerName } = payload

  try {
    const info = yield call(fetchEndpoint, Api.getSummonerByName, summonerName)
    const myleague = yield call(fetchEndpoint, Api.getSummonerLeague, info.id)
    const league =
      myleague.length >= 1
        ? yield call(fetchEndpoint, Api.getSummonerLeagueName, myleague[0].leagueId)
        : null

    yield put({
      type: 'ENTITIES_SUCCESS',
      entityName,
      payload: {
        info,
        myleague,
        league,
      },
    })
  } catch (error) {
    yield put({
      type: 'ENTITIES_FAILURE',
      entityName,
      error: error.message,
    })
  }
}

export default function* saga() {
  yield takeEvery('SUMMONER_REQUEST', fetchSummoner)
}
