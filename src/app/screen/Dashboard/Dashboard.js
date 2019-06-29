// @flow

import * as React from 'react'
import { Redirect } from 'react-router-dom'
import ProfileIcon from 'app/components/ProfileIcon'

type Props = {
  isSummonerLoaded: boolean,
  fetchSummonerId: string => void,
  summoner: SummonerType,
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
  summoner,
}: Props) {
  if (!summonerName) return <Redirect to="/" />
  if (!isSummonerLoaded) {
    fetchSummonerId(summonerName)
    return <div>Loading...</div>
  }

  return (
    <div>
      <span>Dashboard</span>
      <ProfileIcon profileIconId={summoner.profileIconId} />
      {children}
    </div>
  )
}

export default Dashboard
