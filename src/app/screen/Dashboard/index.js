// @flow

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  getLeagueSelector,
  getSoloFlexRanked,
  getSummonerEntitySelector,
} from 'app/service/summoner/selector'
import { fetchSaga } from 'app/store/action'
import { hasEntityError, isEntityFetching } from 'app/service/entityFetching/selector'
import LoaderCustom from 'app/components/LoaderCustom'
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
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchSaga('summoner', { summonerName }))
  }, [dispatch, summonerName])

  const isFetching = useSelector(state => isEntityFetching(state, 'summoner'))
  const entityError = useSelector(state => hasEntityError(state, 'summoner'))

  if (!summonerName) return <Redirect to="/" />
  if (isFetching) return <LoaderCustom />
  if (entityError) return <div>{`Error while fetching: ${entityError}`}</div>

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
