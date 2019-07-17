// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import RatioGame from './RatioGame'

type Props = {
  matchDetails: Array<MatchDetailType>,
  summoner: SummonerType,
}

const Wrapper = styled.div`
  height: 191px;
`

const Header = styled.div`
  ${({ theme: { colors } }) => css`
    background: ${colors.white1};
    height: 35px;
    border: 1px solid ${colors.white3};
    box-shadow: 0 1px ${colors.white2};
    background: ${colors.white1};
    border-radius: 2px;
  `}
`

const Content = styled.div`
  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.white3};
    box-shadow: 0 1px ${colors.white2};
    background: ${colors.white1};
    border-radius: 2px;
    height: 156px;
  `}
`

function WinRateGames({ matchDetails, summoner }: Props) {
  return (
    <Wrapper>
      <Header>Header</Header>
      <Content>
        <RatioGame matchDetails={matchDetails} summoner={summoner} />
      </Content>
    </Wrapper>
  )
}

export default WinRateGames
