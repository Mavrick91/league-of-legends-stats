// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { getChampionById, getSummonerSpellsById } from 'app/service/summoner/selector'
import ChampName from './ChampName'
import Scoreboard from './Scoreboard'
import InfoGame from './InfoGame'
import Build from './Build'
import Participants from './Participants'
import Timeline from './TimeLine'

type Props = {
  matchDetail: MatchDetailType,
  summonerId: string,
}

const Wrapper = styled.div`
  ${({ isWin, theme: { colors } }) => css`
    display: flex;
    height: 98px;
    background: ${isWin ? colors.blue1 : colors.red1};
    border-color: ${isWin ? colors.blue2 : colors.red2};
  `}
`

function MatchRow({ matchDetail, summonerId }: Props) {
  function getParticipantIdentities(): ParticipantIdentityType {
    return (Object.values(matchDetail.participantIdentities): any).find(
      participant => participant.player.summonerId === summonerId,
    )
  }

  function getParticipantsById(myParticipantId): ParticipantType {
    return (Object.values(matchDetail.participants): any).find(
      participant => participant.participantId === myParticipantId,
    )
  }

  function getIsMatchWin(myTeamId): boolean {
    return (
      (Object.values(matchDetail.teams): any).find((team: TeamType) => team.teamId === myTeamId)
        .win === 'Win'
    )
  }

  function getTeamEnemyTotalDeath(myTeamId): number {
    return (Object.values(matchDetail.participants): any).reduce((acc, key) => {
      if (key.teamId === myTeamId) return acc

      return acc + key.stats.deaths
    }, 0)
  }

  const { participantId: myParticipantId } = getParticipantIdentities()
  const {
    teamId,
    championId,
    spell1Id,
    spell2Id,
    stats,
    highestAchievedSeasonTier,
  } = getParticipantsById(myParticipantId)
  const champion = useSelector(state => getChampionById(state, championId))
  const summonerSpell1 = useSelector(state => getSummonerSpellsById(state, spell1Id))
  const summonerSpell2 = useSelector(state => getSummonerSpellsById(state, spell2Id))
  const isWin = getIsMatchWin(teamId)

  return (
    <Wrapper isWin={isWin}>
      <Timeline
        isWin={isWin}
        duration={matchDetail.gameDuration}
        createdDuration={matchDetail.gameCreation}
        gameMode={matchDetail.gameMode}
      />
      <ChampName
        championImage={champion.image.full}
        championName={champion.name}
        summonerSpell1Image={summonerSpell1.image.full}
        summonerSpell2Image={summonerSpell2.image.full}
      />
      <Scoreboard assists={stats.assists} deaths={stats.deaths} kills={stats.kills} />
      <InfoGame
        champLevel={stats.champLevel}
        nbMinionsKilled={
          stats.neutralMinionsKilledEnemyJungle +
          stats.neutralMinionsKilledTeamJungle +
          stats.totalMinionsKilled
        }
        actualRank={highestAchievedSeasonTier}
        killParticipation={((stats.kills + stats.assists) / getTeamEnemyTotalDeath(teamId)) * 100}
      />
      <Build
        isWin={isWin}
        items={[
          { id: 0, item: stats.item0 },
          { id: 1, item: stats.item1 },
          { id: 2, item: stats.item2 },
          { id: 3, item: stats.item6 },
          { id: 4, item: stats.item3 },
          { id: 5, item: stats.item4 },
          { id: 6, item: stats.item5 },
          { id: 7, item: 1 },
        ]}
      />
      <Participants
        myTeamId={teamId}
        participants={(Object.values(matchDetail.participants): any)}
        participantIdentities={(Object.values(matchDetail.participantIdentities): any)}
      />
    </Wrapper>
  )
}

export default React.memo<Props>(MatchRow)
