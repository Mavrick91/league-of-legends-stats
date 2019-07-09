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
  const { league, rankedSolo, rankedFlex } = React.useContext(SummonerContext)
  return (
    <Wrapper>
      <LeftSide>
        <SimpleCard
          leagueName={league.name}
          title="Classé Solo"
          {...pick(
            ['tier', 'rank', 'leaguePoints', 'wins', 'losses'],
            rankedSolo,
          )}
        />
        <SimpleCard
          title="Flex 5:5 Rank"
          showLeague={false}
          imageSize="sm"
          {...pick(
            ['tier', 'rank', 'leaguePoints', 'wins', 'losses'],
            rankedFlex,
          )}
        />
      </LeftSide>
      <div>seconde partie</div>
    </Wrapper>
  )
}

export default Resume
