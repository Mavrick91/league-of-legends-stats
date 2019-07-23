// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Resume from 'app/screen/Resume'
import InformationSummoner from './components/InformationSummoner'

type Props = {
  summoner: {
    info: SummonerType,
  },

  rankedSolo: SoloFlexRanked,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.gray};
    height: 100%;
  `}
`

const Content = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 50px;
`

function Dashboard({ summoner, rankedSolo }: Props) {
  const [valueTab, setValueTab] = React.useState(0)

  return (
    <Wrapper>
      <Content>
        <InformationSummoner
          profileIconId={summoner.info.profileIconId}
          name={summoner.info.name}
          summonerLevel={summoner.info.summonerLevel}
          tier={rankedSolo.tier}
        />
        <AppBar position="static">
          <Tabs component="div" value={valueTab} onChange={(_, newValue) => setValueTab(newValue)}>
            <Tab label="Item One" href={null} />
            <Tab label="Item Two" href={null} />
            <Tab label="Item Three" href={null} />
          </Tabs>
        </AppBar>
        {valueTab === 0 && <Resume />}
      </Content>
    </Wrapper>
  )
}

export default React.memo<Props>(Dashboard)
