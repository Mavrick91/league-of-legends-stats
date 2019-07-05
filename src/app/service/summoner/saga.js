import { takeLatest, call, put, select } from 'redux-saga/effects'
import { pathOr } from 'ramda'
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

export function* fetchSummonerLeagueName(leagueId) {
  const { response, error } = yield call(Api.getSummonerLeagueName, leagueId)
  if (error) throw new Error(error)
  return response.data
}

function* fetchInfo({ summonerName }) {
  const pathname = yield select(getPathnameSelector)
  let league = {}

  try {
    const summonerIds = yield call(fetchSummonerId, summonerName)
    const arrleague = yield call(fetchSummonerLeague, summonerIds.id)
    const summonerLeague = pathOr(null, ['0'], arrleague)
    if (summonerLeague)
      league = yield call(fetchSummonerLeagueName, summonerLeague.leagueId)

    yield put({
      type: FETCH_SUMMONER_SUCCEEDED,
      data: { ...summonerIds, ...summonerLeague, leagueName: league.name },
    })
  } catch (e) {
    yield put({ type: FETCH_SUMMONER_FAILED, message: e.message })
  }

  if (!pathname.includes('/dashboard'))
    yield put(push(`/dashboard/${summonerName}`))
}

export default function* saga() {
  yield takeLatest(FETCH_SUMMONER_REQUEST, fetchInfo)
}
