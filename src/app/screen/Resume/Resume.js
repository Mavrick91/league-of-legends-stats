// @flow

import DisplayMatches from 'app/components/DisplayMatches'
import SimpleCard from 'app/components/SimpleCard'
import WinRateGames from 'app/components/WinRateGames'
import { isEntityFetching } from 'app/service/entityFetching/selector'
import { getMatchDetailsSelector, getMatchListSelector } from 'app/service/matches/selector'
import { fetchSaga, resetEntity } from 'app/store/action'
import { pick } from 'ramda'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { SummonerContext } from '../Dashboard/Dashboard'

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`

const LeftSide = styled.div`
  margin-right: 8px;
  width: 300px;

  & > div + div {
    margin-top: 8px;
  }
`

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 690px;
`

function Resume() {
  const { summoner, league, rankedSolo, rankedFlex } = React.useContext(SummonerContext)
  const [champId, setChampId] = React.useState(null)
  const dispatch = useDispatch()
  const matchDetails = useSelector(getMatchDetailsSelector)
  const matchLists = useSelector(getMatchListSelector)
  const isFetchingMatch = useSelector(state => isEntityFetching(state, 'matches'))

  React.useEffect(() => {
    dispatch(fetchSaga('matches', { accountId: summoner.info.accountId, champId }))
    return () => dispatch(resetEntity('matches'))
  }, [dispatch, champId, summoner.info.accountId])

  return (
    <Wrapper>
      <LeftSide>
        <SimpleCard
          leagueName={league.name}
          title="Ranked Solo"
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
          matchLists={matchLists}
          setChampId={setChampId}
          isFetchingMatch={isFetchingMatch}
        />
        <DisplayMatches matchDetails={matchDetails} summoner={summoner} />
      </RightSide>
    </Wrapper>
  )
}

export default Resume
