// @flow

import React from 'react'
import LoaderCustom from 'app/components/LoaderCustom'
import styled, { css } from 'styled-components'
import RatioGame from './RatioGame'
import RatioChamp from './RatioChamp'
import RatioLane from './RatioLane'
import Header from './Header'

type Props = {
  matchDetails: Array<MatchDetailType>,
  matchLists: Array<MatchType>,
  summoner: SummonerType,
  setChampId: number => void,
  isFetchingMatch: boolean,
}

const Wrapper = styled.div`
  height: 191px;
  margin-bottom: 8px;
`

const Content = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    border: 1px solid ${colors.white3};
    box-shadow: 0 1px ${colors.white2};
    background: ${colors.white1};
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    height: 156px;
    width: 724px;
  `}
`

const NoMatchFound = styled.div`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: ${colors.black11};
  `}
`

function WinRateGames({ matchDetails, matchLists, summoner, setChampId, isFetchingMatch }: Props) {
  function displayComponent() {
    return matchDetails.length > 0 ? (
      <>
        <RatioGame matchDetails={matchDetails} summoner={summoner} />
        <RatioChamp matchDetails={matchDetails} summoner={summoner} />
        <RatioLane matchDetails={matchDetails} summoner={summoner} matchLists={matchLists} />
      </>
    ) : (
      <>
        <NoMatchFound>Aucunes parties récentes sauvegardés.</NoMatchFound>
      </>
    )
  }
  return (
    <Wrapper>
      <Header summoner={summoner} setChampId={setChampId} />
      <Content>{!isFetchingMatch ? displayComponent() : <LoaderCustom />}</Content>
    </Wrapper>
  )
}

export default React.memo<Props>(WinRateGames)
