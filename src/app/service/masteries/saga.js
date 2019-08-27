import { call, put, takeEvery } from 'redux-saga/effects'
import * as Api from 'app/api/endpoints'
import { fetchEndpoint } from 'app/store/saga'

export function* fetchAll({ entityName, payload }) {
  const { encryptedSummonerId } = payload

  try {
    const masteries = yield call(fetchEndpoint, Api.getChampionsMasteries, encryptedSummonerId)

    yield put({
      type: 'ENTITIES_SUCCESS',
      entityName,
      payload: masteries,
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
  yield takeEvery('MASTERIES_REQUEST', fetchAll)
}
