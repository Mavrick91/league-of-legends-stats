import { getSummonerInfo } from '../action'
import { FETCH_SUMMONER_REQUEST } from '../reducer'

describe('Summoner action', () => {
  it('should create action to fetch summoner info', () => {
    expect(getSummonerInfo('mavrick')).toEqual({
      type: FETCH_SUMMONER_REQUEST,
      summonerName: 'mavrick',
    })
  })
})
