// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import RatioGame from './RatioGame'
import RatioChamp from './RatioChamp'
import RatioLane from './RatioLane'

type Props = {
  matchDetails: Array<MatchDetailType>,
  matchLists: Array<MatchType>,
  summoner: SummonerType,
}

const Wrapper = styled.div`
  height: 191px;
`

const Header = styled.div`
  ${({ theme: { colors } }) => css`
    background: ${colors.white1};
    border: 1px solid ${colors.white3};
    box-shadow: 0 1px ${colors.white2};
    background: ${colors.white1};
    border-radius: 2px;
  `}
`

const Content = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    border: 1px solid ${colors.white3};
    box-shadow: 0 1px ${colors.white2};
    background: ${colors.white1};
    border-radius: 2px;
    height: 156px;
  `}
`

function WinRateGames({ matchDetails, matchLists, summoner }: Props) {
  return (
    <Wrapper>
      <Header>Header</Header>
      <Content>
        <RatioGame matchDetails={matchDetails} summoner={summoner} />
        <RatioChamp matchDetails={matchDetails} summoner={summoner} />
        <RatioLane matchDetails={matchDetails} summoner={summoner} matchLists={matchLists} />
      </Content>
    </Wrapper>
  )
}

export default React.memo<Props>(WinRateGames)
