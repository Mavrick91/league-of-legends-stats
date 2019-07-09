// @flow

import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Resume from 'app/screen/Resume'
import InformationSummoner from './components/InformationSummoner'

type Props = {
  summoner: SummonerType,
  rankedSolo: SoloFlexRanked,
}

function Dashboard({ summoner, rankedSolo }: Props) {
  const [valueTab, setValueTab] = React.useState(0)

  return (
    <div style={{ padding: '26px' }}>
      <InformationSummoner
        profileIconId={summoner.profileIconId}
        name={summoner.name}
        summonerLevel={summoner.summonerLevel}
        tier={rankedSolo.tier}
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
      {valueTab === 0 && <Resume />}
    </div>
  )
}

export default Dashboard
