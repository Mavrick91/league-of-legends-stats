import { getSummonerSelector } from '../selector'

describe('Summoner selector', () => {
  describe('getSummonerSelector', () => {
    it('should return the summoner', () => {
      const summonerState = {
        fake: {
          date: 'lol',
        },
      }
      const mockState = {
        summonerState,
      }
      const result = getSummonerSelector(mockState)

      expect(result).toEqual(summonerState)
    })
  })
})
