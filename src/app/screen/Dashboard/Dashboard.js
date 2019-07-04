// @flow

import React from 'react'
import { isEmpty } from 'ramda'
import { Redirect } from 'react-router-dom'
import InformationSummoner from './components/InformationSummoner'

type Props = {
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
  fetchSummonerId,
  summoner,
}: Props) {
  if (!summonerName) return <Redirect to="/" />
  if (isEmpty(summoner)) {
    fetchSummonerId(summonerName)
    return <div>Loading...</div>
  }
  if (summoner.error) return <div>Error while fetching</div>

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
