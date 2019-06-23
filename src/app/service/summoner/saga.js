import { takeLatest, call, put } from 'redux-saga/effects'
import * as Api from 'app/api/endpoints'
import {
  FETCH_SUMMONER_REQUEST,
  FETCH_SUMMONER_SUCCESSED,
  FETCH_SUMMONER_FAILED,
} from './reducer'

function* fetchSummonerInfo({ summonerName }) {
  try {
    const { status, data } = yield call(Api.getSummonerByName, summonerName)
    if (!status === 200) throw new Error()
    yield put({ type: FETCH_SUMMONER_SUCCESSED, data })
  } catch (e) {
    yield put({ type: FETCH_SUMMONER_FAILED, message: 'Summoner not found' })
  }
}

export default function* saga() {
  yield takeLatest(FETCH_SUMMONER_REQUEST, fetchSummonerInfo)
}
