import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchEndpoint } from 'app/store/saga'
import * as Api from 'app/api/endpoints'

export function* fetchAll({ entityName, payload }) {
  const { summonerName } = payload
  const e = {
    info: {},
  }

  try {
    e.info = yield call(fetchEndpoint, Api.getSummonerByName, summonerName)
    e.myleague = yield call(fetchEndpoint, Api.getSummonerLeague, e.info.id)
    e.league =
      e.myleague.length >= 1
        ? yield call(fetchEndpoint, Api.getSummonerLeagueName, e.myleague[0].leagueId)
        : null
    e.allchampions = yield call(fetchEndpoint, Api.getAllChampions)
    e.summonerspells = yield call(fetchEndpoint, Api.getSummonerSpells)
    e.items = yield call(fetchEndpoint, Api.getItems)

    yield put({
      type: 'ENTITIES_SUCCESS',
      entityName,
      payload: e,
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
  yield takeEvery('SUMMONER_REQUEST', fetchAll)
}
