// @flow

import React from 'react'
import { pick } from 'ramda'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SimpleCard from 'app/components/SimpleCard'
import DisplayMatches from 'app/components/DisplayMatches'
import { useSaga } from 'app/utils/customHooks'
import * as Api from 'app/api/endpoints'
import { isEntityFetching } from 'app/service/summoner/selector'
import { getMatchDetailsSelector } from 'app/service/matchDetail/selector'
import WinRateGames from 'app/components/WinRateGames'
import { SummonerContext } from '../Dashboard'

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`

const LeftSide = styled.div`
  margin-right: 25px;
`

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`

function Resume() {
  const { summoner, league, rankedSolo, rankedFlex, matchLists } = React.useContext(SummonerContext)
  const gameIds = (matchLists || []).slice(0, 10).reduce((acc, key) => {
    acc.push(key.gameId)
    return acc
  }, [])
  const matchDetails = useSelector(getMatchDetailsSelector)
  const isFetchingMatch = useSelector(state => isEntityFetching(state, 'match'))

  useSaga('match', Api.getMatchbyId, gameIds)

  if (isFetchingMatch) return <div>Loading...</div>

  return (
    <Wrapper>
      <LeftSide>
        <SimpleCard
          leagueName={league.name}
          title="Classé Solo"
          {...pick(['tier', 'rank', 'leaguePoints', 'wins', 'losses'], rankedSolo)}
        />
        <SimpleCard
          title="Flex 5:5 Rank"
          showLeague={false}
          imageSize="sm"
          {...pick(['tier', 'rank', 'leaguePoints', 'wins', 'losses'], rankedFlex)}
        />
      </LeftSide>
      <RightSide>
        <WinRateGames
          matchDetails={matchDetails}
          summoner={summoner}
          matchLists={(matchLists || []).slice(0, 10)}
        />
        <DisplayMatches matchDetails={matchDetails} summoner={summoner} />
      </RightSide>
    </Wrapper>
  )
}

export default Resume
