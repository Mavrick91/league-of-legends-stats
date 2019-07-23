import { call, put, all, takeEvery } from 'redux-saga/effects'
import * as Api from 'app/api/endpoints'
import { fetchEndpoint } from 'app/store/saga'

export function* fetchAll({ entityName, payload }) {
  const { accountId, champId } = payload
  const e = {}

  try {
    e.list = yield call(fetchEndpoint, Api.getMatchList, accountId, {
      params: {
        endIndex: 10,
        champion: champId,
      },
    })
    const gameIds = e.list.matches.reduce((acc, key) => {
      acc.push(key.gameId)
      return acc
    }, [])
    e.details = yield all(gameIds.map(id => call(fetchEndpoint, Api.getMatchById, id)))

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
  yield takeEvery('MATCHES_REQUEST', fetchAll)
}
