// @flow

import LoaderCustom from 'app/components/LoaderCustom'
import { isEntityFetching } from 'app/service/entityFetching/selector'
import { fetchSaga, resetEntity } from 'app/store/action'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'

type Props = {
  match: {
    params: { summonerName?: string },
  },
  history: { push: (*) => void },
}

function DashboardContainer({
  match: {
    params: { summonerName },
  },
  history,
}: Props) {
  const dispatch = useDispatch()
  const isStaticDataFetching = useSelector(state => isEntityFetching(state, 'static_data'))

  React.useEffect(() => {
    if (!isStaticDataFetching) dispatch(fetchSaga('summoner', { summonerName }))
    return () => {
      dispatch(resetEntity('summoner'))
    }
  }, [dispatch, summonerName, isStaticDataFetching])

  const isSummonerFetching = useSelector(state => isEntityFetching(state, 'summoner'))

  if (!summonerName) return <Redirect to="/" />
  if (isSummonerFetching) return <LoaderCustom />

  return <Dashboard history={history} />
}

export default React.memo<Props>(DashboardContainer)
