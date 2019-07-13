// @flow

import React from 'react'
import styled from 'styled-components'
import ParticipantRow from './ParticipantRow'

type Props = {
  myTeamId: number,
  participants: ParticipantType,
  participantIdentities: ParticipantIdentityType,
}

const Wrapper = styled.div`
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Team = styled.div`
  display: flex;
  flex-direction: column;
  width: 85px;
`

function Participants({ participants, participantIdentities, myTeamId }: Props) {
  function getTeam(myTeam) {
    return participants.filter(participant => {
      if (myTeam) return participant.teamId === myTeamId
      return participant.teamId !== myTeamId
    })
  }

  function displayTeam(team) {
    return (
      <Team>
        {team.map(player => (
          <ParticipantRow
            key={player.championId}
            championId={player.championId}
            player={
              participantIdentities.find(item => item.participantId === player.participantId).player
            }
          />
        ))}
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
