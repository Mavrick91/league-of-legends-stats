// @flow

import React from 'react'
import { pick } from 'ramda'
import styled from 'styled-components'
import SimpleCard from 'app/components/SimpleCard'
import { SummonerContext } from '../Dashboard'

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`

const LeftSide = styled.div`
  margin-right: 25px;
`

function Resume() {
  const { myleague, league } = React.useContext(SummonerContext)

  const soloRanked = pick(
    ['tier', 'rank', 'leaguePoints', 'wins', 'losses'],
    myleague,
  )

  return (
    <Wrapper>
      <LeftSide>
        <SimpleCard
          leagueName={league.name}
          title="Classé Solo"
          {...soloRanked}
        />
        <SimpleCard
          title="Flex 5:5 Rank"
          showLeague={false}
          imageSize="sm"
          leagueName={league.name}
          {...soloRanked}
        />
      </LeftSide>
      <div>seconde partie</div>
    </Wrapper>
  )
}

export default Resume
