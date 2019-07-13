// @flow

import React from 'react'
import styled from 'styled-components'
import MatchRow from './MatchRow'

type Props = {
  matchDetails: *,
  summoner: SummonerType,
}

const Wrapper = styled.div`
  & > div + div {
    margin-top: 8px;
  }
`

function DisplayMatches({ matchDetails, summoner }: Props) {
  return (
    <Wrapper>
      {matchDetails.map((matchDetail: MatchType) => (
        <MatchRow key={matchDetail.gameId} matchDetail={matchDetail} summonerId={summoner.id} />
      ))}
    </Wrapper>
  )
}

export default React.memo(DisplayMatches)
