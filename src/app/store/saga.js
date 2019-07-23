import { call } from 'redux-saga/effects'

export function* fetchEndpoint(apiEndpoint, ...args) {
  let response = {}

  try {
    response = yield call(apiEndpoint, ...args)
  } catch (e) {}

  return response.data
}
