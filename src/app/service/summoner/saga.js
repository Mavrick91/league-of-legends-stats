import { takeLatest, call, put, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as Api from 'app/api/endpoints'
import { getPathnameSelector } from 'app/service/route/selector'
import {
  FETCH_SUMMONER_REQUEST,
  FETCH_SUMMONER_SUCCEEDED,
  FETCH_SUMMONER_FAILED,
} from './reducer'

export function* fetchSummonerLeague(encryptedSummonerId) {
  const { response, error } = yield call(
    Api.getSummonerLeague,
    encryptedSummonerId,
  )
  if (error) throw new Error(error)
  return response.data
}

export function* fetchSummonerId(summonerName) {
  const { response, error } = yield call(Api.getSummonerByName, summonerName)
  if (error) throw new Error(error)
  return response.data
}

function* fetchInfo({ summonerName }) {
  const pathname = yield select(getPathnameSelector)

  try {
    const summonerIds = yield call(fetchSummonerId, summonerName)
    const league = yield call(fetchSummonerLeague, summonerIds.id)

    console.log('{ ...summonerIds, ...league[0] } ----->', { ...summonerIds, ...league[0] });
    yield put({
      type: FETCH_SUMMONER_SUCCEEDED,
      data: { ...summonerIds, ...league[0] },
    })
  } catch (e) {
    console.log('e ----->', e.message)
    yield put({ type: FETCH_SUMMONER_FAILED, message: e.message })
  }

  if (!pathname.includes('/dashboard'))
    yield put(push(`/dashboard/${summonerName}`))
}

export default function* saga() {
  yield takeLatest(FETCH_SUMMONER_REQUEST, fetchInfo)
}
