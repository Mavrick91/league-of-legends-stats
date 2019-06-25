import { createSelector } from 'reselect'

const getAccountId = state => state.summonerState.accountId

const getSummonerName = state => state.summonerState.name

export const getAccountIdSelector = createSelector(
  getAccountId,
  accountId => accountId,
)

export const getSummonerNameSelector = createSelector(
  getSummonerName,
  name => name,
)
