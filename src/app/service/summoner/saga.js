import { takeLatest, call, put, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as Api from 'app/api/endpoints'
import { updateLoader } from 'app/service/loader/action'
import { getPathnameSelector } from 'app/service/route/selector'
import {
  FETCH_SUMMONER_REQUEST,
  FETCH_SUMMONER_SUCCEEDED,
  FETCH_SUMMONER_FAILED,
} from './reducer'

export function* fetchSummonerInfo({ summonerName }) {
  const pathname = yield select(getPathnameSelector)

  try {
    yield put(updateLoader(FETCH_SUMMONER_REQUEST, 1))
    const { status, data } = yield call(Api.getSummonerByName, summonerName)
    if (status !== 200) {
      yield put({ type: FETCH_SUMMONER_FAILED, message: 'Summoner not found' })
      yield put(updateLoader(FETCH_SUMMONER_REQUEST, -1))
    } else {
      yield put({ type: FETCH_SUMMONER_SUCCEEDED, data })
      yield put(updateLoader(FETCH_SUMMONER_REQUEST, 0))
      if (!pathname.includes('/dashboard'))
        yield put(push(`/dashboard/${summonerName}`))
    }
  } catch (e) {
    yield put({ type: FETCH_SUMMONER_FAILED, message: e })
    yield put(updateLoader(FETCH_SUMMONER_REQUEST, -1))
  }
}

export default function* saga() {
  yield takeLatest(FETCH_SUMMONER_REQUEST, fetchSummonerInfo)
}
