// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import Resume from 'app/screen/Resume'
import ResearchBar from 'app/components/ResearchBar'
import SummonerNotFound from 'app/screen/SummonerNotFound'
import InformationSummoner from './components/InformationSummoner'
import UnderMaintenance from '../UnderMaintenance'
import Tabs from './Tabs'
import Champions from '../Champions'

type Props = {
  summoner: {
    info: SummonerType,
    error?: string,
  },
  rankedSolo: SoloFlexRanked,
  history: { push: (*) => void },
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.gray};
    min-height: 100%;
    padding-bottom: 40px;
  `}
`

const Content = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 50px;
`

function Dashboard({ summoner, rankedSolo, history }: Props) {
  const [activeTab, setActiveTab] = React.useState(1)

  return (
    <Wrapper>
      <ResearchBar history={history} />
      {summoner.error ? (
        <SummonerNotFound />
      ) : (
        <Content>
          <InformationSummoner
            profileIconId={summoner.info.profileIconId}
            name={summoner.info.name}
            summonerLevel={summoner.info.summonerLevel}
            tier={rankedSolo.tier}
          />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 0 && <Resume />}
          {activeTab === 1 && <Champions />}
          {activeTab === 2 && <UnderMaintenance />}
        </Content>
      )}
    </Wrapper>
  )
}

export default React.memo<Props>(Dashboard)
