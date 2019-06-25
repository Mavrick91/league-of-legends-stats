import faker from 'faker'
import reducer, {
  FETCH_SUMMONER_SUCCEEDED,
  FETCH_SUMMONER_FAILED,
} from '../reducer'

const data = {
  id: faker.lorem.lines(),
  accountId: faker.lorem.lines(),
  puuid: faker.lorem.lines(),
  name: 'Master Thresh',
  profileIconId: faker.random.number(),
  revisionDate: faker.random.number(),
  summonerLevel: faker.random.number(),
}

describe('Summoner reducer', () => {
  it('should return the default state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle FETCH_SUMMONER_SUCCEEDED', () => {
    const action = {
      type: FETCH_SUMMONER_SUCCEEDED,
      data,
    }
    expect(reducer(undefined, action)).toEqual(data)
  })

  it('should handle FETCH_SUMMONER_FAILED', () => {
    const message = 'random message'
    const action = {
      type: FETCH_SUMMONER_FAILED,
      message,
    }
    expect(reducer(undefined, action)).toEqual({
      error: message,
    })
  })
})
