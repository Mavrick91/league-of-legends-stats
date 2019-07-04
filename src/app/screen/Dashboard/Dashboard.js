// @flow

import React from 'react'
import { isEmpty } from 'ramda'
import { Redirect } from 'react-router-dom'
import InformationSummoner from './components/InformationSummoner'

type Props = {
  isSummonerLoaded: boolean,
  fetchSummonerId: string => void,
  summoner: SummonerType,
  match: {
    params: { summonerName?: string },
  },
}

function Dashboard({
  match: {
    params: { summonerName },
  },
  isSummonerLoaded,
  fetchSummonerId,
  summoner,
}: Props) {
  if (!summonerName) return <Redirect to="/" />
  if (!isSummonerLoaded) {
    fetchSummonerId(summonerName)
    return <div>Loading...</div>
  }

  return (
    <div style={{ padding: '26px' }}>
      <InformationSummoner
        profileIconId={summoner.profileIconId}
        name={summoner.name}
        summonerLevel={summoner.summonerLevel}
        tier={summoner.tier}
      />
    </div>
  )
}

export default Dashboard
