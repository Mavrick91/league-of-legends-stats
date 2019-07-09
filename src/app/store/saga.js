import { call, put, takeLatest } from 'redux-saga/effects'

export function* fetchEntity(action) {
  const { apiEndpoint, urlParams, entityName } = action

  try {
    const response = yield call(apiEndpoint, ...urlParams)

    if (Array.isArray(response.data)) {
      response.data = response.data[0]
    }

    yield put({
      type: `${entityName.toUpperCase()}_SUCCESS`,
      entityName,
      payload: response.data,
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
  yield takeLatest('ENTITY_REQUEST', fetchEntity)
}
