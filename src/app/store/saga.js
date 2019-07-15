import { call, put, all, takeEvery } from 'redux-saga/effects'

export function* fetchEntity(action) {
  const { apiEndpoint, entityName, payload } = action
  let response = {}
  try {
    if (Array.isArray(payload[0])) {
      response = yield all(payload[0].map(key => call(apiEndpoint, key)))
    } else response = yield call(apiEndpoint, ...payload)

    yield put({
      type: `${entityName.toUpperCase()}_SUCCESS`,
      entityName,
      payload: Array.isArray(response) ? response.map(item => item.data) : response.data,
    })

    return response.data
  } catch (error) {
    yield put({
      type: `${entityName.toUpperCase()}_FAILURE`,
      entityName,
      error: error.message,
    })
  }
}

export default function* saga() {
  yield takeEvery('ENTITY_REQUEST', fetchEntity)
}
