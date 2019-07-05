// @flow

import React from 'react'
import { pick } from 'ramda'
import styled from 'styled-components'
import SimpleCard from 'app/components/SimpleCard'
import { SummonerContext } from '../Dashboard/Dashboard'

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`

const LeftSide = styled.div`
  margin-right: 25px;
`

function Resume() {
  const summoner = React.useContext(SummonerContext)

  const soloRanked = pick(
    ['tier', 'rank', 'leaguePoints', 'wins', 'losses', 'leagueName'],
    summoner,
  )
  return (
    <Wrapper>
      <LeftSide>
        <SimpleCard title="Classé Solo" {...soloRanked} />
        <SimpleCard
          title="Flex 5:5 Rank"
          showLeague={false}
          imageSize="sm"
          {...soloRanked}
        />
      </LeftSide>
      <div>seconde partie</div>
    </Wrapper>
  )
}

export default Resume
