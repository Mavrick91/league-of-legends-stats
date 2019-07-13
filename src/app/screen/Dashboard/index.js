// @flow

import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  getLeagueSelector, getMatchListsSelector,
  getSoloFlexRanked,
  getSummonerSelector,
  hasEntityError,
  isEntityFetching,
} from 'app/service/summoner/selector'
import { useSaga } from 'app/utils/customHooks'
import * as Api from 'app/api/endpoints'
import Dashboard from './Dashboard'

type Props = {
  match: {
    params: { summonerName?: string },
  },
}

export const SummonerContext: Object = React.createContext()

function useEntities(summonerName) {
  const summoner = useSelector(getSummonerSelector)
  const rankedSolo = useSelector(state => getSoloFlexRanked(state, 'RANKED_SOLO_5x5'))
  const league = useSelector(getLeagueSelector)

  useSaga('summoner', Api.getSummonerByName, summonerName)
  useSaga('myleague', Api.getSummonerLeague, summoner.id)
  useSaga('league', Api.getSummonerLeagueName, rankedSolo.leagueId)
  useSaga('allchampions', Api.getAllChampions)
  useSaga('summonerspells', Api.getSummonerSpells)
  useSaga('items', Api.getItems)
  useSaga('matchlists', Api.getMatchList, summoner.accountId)

  return { summoner, league }
}

function DashboardContainer({
  match: {
    params: { summonerName },
  },
}: Props) {
  const { summoner, league } = useEntities(summonerName)
  const isFetching = useSelector(isEntityFetching)
  const entityError = useSelector(hasEntityError)
  const rankedSolo = useSelector(state => getSoloFlexRanked(state, 'RANKED_SOLO_5x5'))
  const rankedFlex = useSelector(state => getSoloFlexRanked(state, 'RANKED_FLEX_SR'))
  const matchLists = useSelector(getMatchListsSelector)

  if (!summonerName) return <Redirect to="/" />
  if (isFetching) return <div>Loading...</div>
  if (entityError) return <div>{`Error while fetching: ${entityError}`}</div>

  return (
    <SummonerContext.Provider
      value={{
        summoner,
        league,
        rankedSolo,
        rankedFlex,
        matchLists,
      }}
    >
      <Dashboard summoner={summoner} rankedSolo={rankedSolo} />
    </SummonerContext.Provider>
  )
}

export default DashboardContainer
