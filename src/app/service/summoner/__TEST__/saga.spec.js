import mockAxios from 'axios'
import { runSaga } from 'redux-saga'
import { fetchSummonerId } from '../saga'
import { FETCH_SUMMONER_SUCCEEDED, FETCH_SUMMONER_FAILED } from '../reducer'

describe('Summoner saga', () => {
  const getState = jest.fn(() => ({
    router: {
      location: {
        pathname: 'lol',
      },
    },
  }))

  describe('fetchSummonerId', () => {
    it('should resolve api call', async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: 'some fake data', status: 200 }),
      )
      const data = await runSaga(
        {
          getState,
        },
        fetchSummonerId,
        { summonerName: 'master thresh' },
      ).toPromise()

      expect(data).toEqual('some fake data')
    })
  })
})
