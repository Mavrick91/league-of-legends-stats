// @flow

import { getSummonerEntitySelector } from 'app/service/summoner/selector'
import { getMyParticipantIdentities, getParticipantsById } from 'app/utils'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ArrayOverview from './ArrayOverview'
import Summary from './Summary'

type Props = {
  matchDetail: MatchDetailType,
}

const Wrapper = styled.div`
  background: white;
  width: 100%;
  z-index: 10;
`

const Overview = ({ matchDetail }: Props) => {
  const summoner: SummonerType = useSelector(getSummonerEntitySelector)
  const myParticipantIdentities = getMyParticipantIdentities(matchDetail, summoner.info.id)
  const myParticipant = getParticipantsById(matchDetail, myParticipantIdentities.participantId)

  function getParticipants(teamId: number) {
    return matchDetail.participants
      .filter(p => p.teamId === teamId)
      .map(p => {
        const {
          player: { summonerName },
        }: ParticipantIdentitiesType = (matchDetail.participantIdentities: any).find(
          pi => p.participantId === pi.participantId,
        )

        return {
          ...p,
          summonerName,
        }
      })
  }

  const { myTeamId, enemyTeamId } = React.useMemo(
    () =>
      matchDetail.teams.reduce(
        (acc, team) => {
          if (team.teamId === myParticipant.teamId) acc.myTeamId = team.teamId
          else acc.enemyTeamId = team.teamId
          return acc
        },
        { myTeamId: 0, enemyTeamId: 0 },
      ),
    [matchDetail.teams, myParticipant],
  )

  const maxDamageDealt = React.useMemo(
    () => Math.max(...matchDetail.participants.map(p => p.stats.totalDamageDealtToChampions)),
    [matchDetail.participants],
  )

  return (
    <Wrapper>
      <ArrayOverview
        participants={getParticipants(myTeamId)}
        team={matchDetail.teams.filter(team => team.teamId === myTeamId)[0]}
        matchDetail={matchDetail}
        maxDamageDealt={maxDamageDealt}
      />
      <Summary
        myTeam={matchDetail.teams.filter(team => team.teamId === myTeamId)[0]}
        myParticipants={getParticipants(myTeamId)}
        enemyTeam={matchDetail.teams.filter(team => team.teamId === enemyTeamId)[0]}
        enemyParticipants={getParticipants(enemyTeamId)}
      />
      <ArrayOverview
        participants={getParticipants(enemyTeamId)}
        team={matchDetail.teams.filter(team => team.teamId === enemyTeamId)[0]}
        matchDetail={matchDetail}
        maxDamageDealt={maxDamageDealt}
      />
    </Wrapper>
  )
}

export default Overview
