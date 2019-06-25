import { getSummonerNameSelector, getAccountIdSelector } from '../selector'

describe('Summoner selector', () => {
  describe('getAccountIdSelector', () => {
    it('should return the account Id', () => {
      const accountId = '1234567890'
      const mockState = {
        summonerState: {
          accountId,
        },
      }
      const result = getAccountIdSelector(mockState)

      expect(result).toEqual(accountId)
    })
  })

  describe('getSummonerNameSelector', () => {
    it('should return the account Id', () => {
      const name = 'master thresh'
      const mockState = {
        summonerState: {
          name,
        },
      }
      const result = getSummonerNameSelector(mockState)

      expect(result).toEqual(name)
    })
  })
})
