import { call, put, takeEvery } from 'redux-saga/effects'
import * as Api from 'app/api/endpoints'
import { fetchEndpoint } from 'app/store/saga'

export function* fetchAll({ entityName }) {
  try {
    const versions = yield call(fetchEndpoint, Api.getVersions)
    yield put({
      type: 'ENTITIES_SUCCESS',
      entityName,
      payload: versions.n,
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
  yield takeEvery('VERSIONS_REQUEST', fetchAll)
}
