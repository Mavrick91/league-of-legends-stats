// @flow

import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  getLeagueSelector,
  getMyleagueSelector,
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
  const myleague = useSelector(getMyleagueSelector)
  const league = useSelector(getLeagueSelector)

  useSaga('summoner', Api.getSummonerByName, [summonerName])
  useSaga('myleague', Api.getSummonerLeague, [summoner.id])
  useSaga('league', Api.getSummonerLeagueName, [myleague.leagueId])

  return { summoner, myleague, league }
}

function DashboardContainer({
  match: {
    params: { summonerName },
  },
}: Props) {
  const { summoner, myleague, league } = useEntities(summonerName)
  const isFetching = useSelector(isEntityFetching)
  const entityError = useSelector(hasEntityError)

  if (!summonerName) return <Redirect to="/" />
  if (isFetching) return <div>Loading...</div>
  if (entityError) return <div>{`Error while fetching: ${entityError}`}</div>

  return (
    <SummonerContext.Provider
      value={{
        summoner,
        league,
        myleague,
      }}
    >
      <Dashboard summoner={summoner} myleague={myleague} />
    </SummonerContext.Provider>
  )
}

export default DashboardContainer
