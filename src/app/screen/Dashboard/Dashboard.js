// @flow

import * as React from 'react'
import { Redirect } from 'react-router-dom'

type Props = {
  isSummonerLoaded: boolean,
  fetchSummonerId: string => void,
  match: {
    params: { summonerName?: string },
  },
  children: $ReadOnlyArray<React.Node>,
}

function Dashboard({
  match: {
    params: { summonerName },
  },
  isSummonerLoaded,
  fetchSummonerId,
  children,
}: Props) {
  if (!summonerName) return <Redirect to="/" />
  if (!isSummonerLoaded) {
    fetchSummonerId(summonerName)
    return <div>Loading...</div>
  }

  return (
    <div>
      <span>Dashboard</span>
      {children}
    </div>
  )
}

export default Dashboard
