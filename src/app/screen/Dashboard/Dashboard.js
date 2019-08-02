// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import Resume from 'app/screen/Resume'
import MainTabs from 'app/components/Tabs/Tabs'
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
    min-height: 100%;
    padding-bottom: 40px;
  `}
`

const Content = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 50px;
`

function Dashboard({ summoner, rankedSolo }: Props) {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <Wrapper>
      <Content>
        <InformationSummoner
          profileIconId={summoner.info.profileIconId}
          name={summoner.info.name}
          summonerLevel={summoner.info.summonerLevel}
          tier={rankedSolo.tier}
        />
        <MainTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 0 && <Resume />}
      </Content>
    </Wrapper>
  )
}

export default React.memo<Props>(Dashboard)
