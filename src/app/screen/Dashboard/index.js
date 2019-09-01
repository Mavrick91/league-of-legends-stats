// @flow

import React from 'react'
import { isEmpty } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  getLeagueSelector,
  getSoloFlexRanked,
  getSummonerEntitySelector,
} from 'app/service/summoner/selector'
import { fetchSaga, resetEntity } from 'app/store/action'
import { isEntityFetching } from 'app/service/entityFetching/selector'
import LoaderCustom from 'app/components/LoaderCustom'
import { getVersionsSelector } from 'app/service/versions/selector'
import Dashboard from './Dashboard'

type Props = {
  match: {
    params: { summonerName?: string },
  },
  history: { push: (*) => void },
}

export const SummonerContext: Object = React.createContext()

function DashboardContainer({
  match: {
    params: { summonerName },
  },
  history,
}: Props) {
  const summoner = useSelector(getSummonerEntitySelector)
  const rankedSolo = useSelector(state => getSoloFlexRanked(state, 'RANKED_SOLO_5x5'))
  const rankedFlex = useSelector(state => getSoloFlexRanked(state, 'RANKED_FLEX_SR'))
  const league = useSelector(getLeagueSelector)
  const versions = useSelector(getVersionsSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (versions && versions.isFetching === false) dispatch(fetchSaga('summoner', { summonerName }))
    return () => dispatch(resetEntity('summoner'))
  }, [dispatch, summonerName, versions])

  React.useEffect(() => {
    dispatch(fetchSaga('versions'))
  }, [dispatch])

  const isFetching = useSelector(state => isEntityFetching(state, 'summoner'))

  if (!summonerName) return <Redirect to="/" />
  if (isFetching || isEmpty(summoner)) return <LoaderCustom />

  return (
    <SummonerContext.Provider
      value={{
        summoner,
        league,
        rankedSolo,
        rankedFlex,
      }}
    >
      <Dashboard summoner={summoner} rankedSolo={rankedSolo} history={history} />
    </SummonerContext.Provider>
  )
}

export default React.memo<Props>(DashboardContainer)
