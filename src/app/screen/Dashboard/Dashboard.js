// @flow

import ResearchBar from 'app/components/ResearchBar'
import Resume from 'app/screen/Resume'
import SummonerNotFound from 'app/screen/SummonerNotFound'
import {
  getLeagueSelector,
  getSoloFlexRanked,
  getSummonerEntitySelector,
} from 'app/service/summoner/selector'
import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import Champions from '../Champions'
import UnderMaintenance from '../UnderMaintenance'
import InformationSummoner from './components/InformationSummoner'
import Tabs from './Tabs'

type Props = {
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

export const SummonerContext: Object = React.createContext()

function Dashboard({ history }: Props) {
  const [activeTab, setActiveTab] = React.useState(0)
  const summoner = useSelector(getSummonerEntitySelector)
  const rankedSolo = useSelector(state => getSoloFlexRanked(state, 'RANKED_SOLO_5x5')) || {}
  const rankedFlex = useSelector(state => getSoloFlexRanked(state, 'RANKED_FLEX_SR')) || {}
  const league = useSelector(getLeagueSelector)

  return (
    <SummonerContext.Provider
      value={{
        summoner,
        league,
        rankedSolo,
        rankedFlex,
      }}
    >
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
    </SummonerContext.Provider>
  )
}

export default React.memo<Props>(Dashboard)
