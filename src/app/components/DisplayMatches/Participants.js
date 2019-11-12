// @flow

import React from 'react'
import styled from 'styled-components'
import ParticipantRow from './ParticipantRow'

type Props = {
  championVersion: number,
  myTeamId: number,
  participants: $ReadOnlyArray<ParticipantsType>,
  participantIdentities: $ReadOnlyArray<ParticipantIdentitiesType>,
}

const Wrapper = styled.div`
  width: 183px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Team = styled.div`
  display: flex;
  flex-direction: column;
  width: 85px;
`

function Participants({ participants, participantIdentities, myTeamId, championVersion }: Props) {
  function getTeam(myTeam) {
    return participants.filter(participant => {
      if (myTeam) return participant.teamId === myTeamId
      return participant.teamId !== myTeamId
    })
  }

  function displayTeam(team) {
    return (
      <Team>
        {team.map(teamPlayer => {
          const participantIdentity = (participantIdentities.find(
            (item: *) => item.participantId === teamPlayer.participantId,
          ): any)

          return (
            <ParticipantRow
              championVersion={championVersion}
              key={teamPlayer.championId}
              championId={teamPlayer.championId}
              player={participantIdentity.player}
            />
          )
        })}
      </Team>
    )
  }

  const myTeam = getTeam(true)
  const enemyTeam = getTeam(false)

  return (
    <Wrapper>
      {displayTeam(myTeam)}
      {displayTeam(enemyTeam)}
    </Wrapper>
  )
}

export default Participants
