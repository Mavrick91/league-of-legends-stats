import * as Api from 'app/api/endpoints'
import { fetchEndpoint } from 'app/store/saga'
import { call, put, takeEvery } from 'redux-saga/effects'

export function* fetchStaticData({ entityName }) {
  try {
    const { n: versions } = yield call(fetchEndpoint, Api.getVersions)
    const allChampions = yield call(fetchEndpoint, Api.getAllChampions, versions.champion)
    const summonerSpells = yield call(fetchEndpoint, Api.getSummonerSpells, versions.summoner)
    const items = yield call(fetchEndpoint, Api.getItems, versions.item)

    yield put({
      type: 'ENTITIES_SUCCESS',
      entityName,
      payload: {
        versions,
        allChampions: allChampions.data,
        summonerSpells: summonerSpells.data,
        items: items.data,
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
  yield takeEvery('STATIC_DATA_REQUEST', fetchStaticData)
}
