// @flow

import React from 'react'
import { isEmpty } from 'ramda'
import { Redirect } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Resume from 'app/screen/Resume'
import InformationSummoner from './components/InformationSummoner'

type Props = {
  fetchSummonerId: string => void,
  summoner: SummonerType,
  match: {
    params: { summonerName?: string },
  },
}

export const SummonerContext: Object = React.createContext()

function Dashboard({
  match: {
    params: { summonerName },
  },
  fetchSummonerId,
  summoner,
}: Props) {
  const [valueTab, setValueTab] = React.useState(0)

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
      <AppBar position="static">
        <Tabs
          component="div"
          value={valueTab}
          onChange={(_, newValue) => setValueTab(newValue)}
        >
          <Tab label="Item One" href={null} />
          <Tab label="Item Two" href={null} />
          <Tab label="Item Three" href={null} />
        </Tabs>
      </AppBar>
      <SummonerContext.Provider value={summoner}>
        {valueTab === 0 && <Resume />}
      </SummonerContext.Provider>
    </div>
  )
}

export default Dashboard
