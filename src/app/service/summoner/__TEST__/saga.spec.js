import mockAxios from 'axios'
import { runSaga } from 'redux-saga'
import { fetchSummonerInfo } from '../saga'
import { FETCH_SUMMONER_SUCCEEDED, FETCH_SUMMONER_FAILED } from '../reducer'

describe('Summoner saga', () => {
  it('should resolve api call', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: 'some fake data', status: 200 }),
    )
    const dispatched = []

    await runSaga(
      {
        dispatch: action => dispatched.push(action),
      },
      fetchSummonerInfo,
      { summonerName: 'master thresh' },
    ).toPromise()

    expect(dispatched).toEqual([
      { type: FETCH_SUMMONER_SUCCEEDED, data: 'some fake data' },
    ])
  })

  it('should reject api call', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('something bad happened')),
    )
    const dispatched = []

    await runSaga(
      {
        dispatch: action => dispatched.push(action),
      },
      fetchSummonerInfo,
      { summonerName: 'master thresh' },
    ).toPromise()

    expect(dispatched).toEqual([
      { type: FETCH_SUMMONER_FAILED, message: 'Summoner not found' },
    ])
  })
})
