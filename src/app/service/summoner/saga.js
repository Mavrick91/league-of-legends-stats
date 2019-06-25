import { takeLatest, call, put } from 'redux-saga/effects'
import * as Api from 'app/api/endpoints'
import {
  FETCH_SUMMONER_REQUEST,
  FETCH_SUMMONER_SUCCEEDED,
  FETCH_SUMMONER_FAILED,
} from './reducer'

export function* fetchSummonerInfo({ summonerName }) {
  try {
    const { status, data } = yield call(Api.getSummonerByName, summonerName)
    if (status !== 200) {
      yield put({ type: FETCH_SUMMONER_FAILED, message: 'Summoner not found' })
    }
    yield put({ type: FETCH_SUMMONER_SUCCEEDED, data })
  } catch (e) {
    yield put({ type: FETCH_SUMMONER_FAILED, message: 'Summoner not found' })
  }
}

export default function* saga() {
  yield takeLatest(FETCH_SUMMONER_REQUEST, fetchSummonerInfo)
}
