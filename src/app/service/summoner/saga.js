import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as Api from 'app/api/endpoints'
import { updateLoader } from 'app/service/loader/action'
import {
  FETCH_SUMMONER_REQUEST,
  FETCH_SUMMONER_SUCCEEDED,
  FETCH_SUMMONER_FAILED,
} from './reducer'

export function* fetchSummonerInfo({ summonerName }) {
  try {
    yield put(updateLoader(FETCH_SUMMONER_REQUEST, 1))
    const { status, data } = yield call(Api.getSummonerByName, summonerName)
    if (status !== 200) {
      yield put({ type: FETCH_SUMMONER_FAILED, message: 'Summoner not found' })
      yield put(updateLoader(FETCH_SUMMONER_REQUEST, -1))
    } else {
      yield put({ type: FETCH_SUMMONER_SUCCEEDED, data })
      yield put(updateLoader(FETCH_SUMMONER_REQUEST, 0))
    }
    yield put(push('/dashboard'))
  } catch (e) {
    yield put({ type: FETCH_SUMMONER_FAILED, message: 'Summoner not found' })
    yield put(updateLoader(FETCH_SUMMONER_REQUEST, -1))
  }
}

export default function* saga() {
  yield takeLatest(FETCH_SUMMONER_REQUEST, fetchSummonerInfo)
}
