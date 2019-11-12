// @flow

import MatchDetails from 'app/components/MatchDetails'
import ArrowRight from 'app/ressources/images/svg/ArrowRight'
import {
  getChampionById,
  getSummonerSpellsById,
  getVersionsSelector,
} from 'app/service/staticData/selector'
import { getMyParticipantIdentities, getParticipantsById, getTeamEnemyTotalDeath } from 'app/utils'
import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import Build from './Build'
import ChampName from './ChampName'
import InfoGame from './InfoGame'
import Participants from './Participants'
import Scoreboard from './Scoreboard'
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
    border: 1px solid ${isWin ? colors.blue2 : colors.red2};
  `}
`

const Expand = styled.div`
  ${({ isWin, theme: { colors }, isCollapse }) => css`
    width: 30px;
    background: ${isWin ? colors.blue5 : colors.red4};
    border: 1px solid ${isWin ? colors.blue6 : colors.red3};
    position: relative;

    svg {
      position: absolute;
      bottom: 10px;
      left: 23%;
      opacity: 0.5;
      transition: transform 0.3s ease-out;
      transform: rotate(${!isCollapse ? '90deg' : '-90deg'});

      &:hover {
        cursor: pointer;
      }
    }
  `}
`

function MatchRow({ matchDetail, summonerId }: Props) {
  const [displayDetails, setDisplayDetails] = React.useState(false)

  function getIsMatchWin(myTeamId): boolean {
    return (
      (Object.values(matchDetail.teams): any).find((team: TeamType) => team.teamId === myTeamId)
        .win === 'Win'
    )
  }

  const { participantId: myParticipantId } = getMyParticipantIdentities(matchDetail, summonerId)
  const {
    teamId,
    championId,
    spell1Id,
    spell2Id,
    stats,
    highestAchievedSeasonTier,
  } = getParticipantsById(matchDetail, myParticipantId)
  const champion = useSelector(state => getChampionById(state, championId))
  const versions = useSelector(getVersionsSelector)
  const summonerSpell1 = useSelector(state => getSummonerSpellsById(state, spell1Id))
  const summonerSpell2 = useSelector(state => getSummonerSpellsById(state, spell2Id))
  const isWin = getIsMatchWin(teamId)

  return (
    <>
      <Wrapper isWin={isWin}>
        <Timeline
          isWin={isWin}
          duration={matchDetail.gameDuration}
          createdDuration={matchDetail.gameCreation}
          gameMode={matchDetail.gameMode}
        />
        <ChampName
          championVersion={versions.champion}
          summonerVersion={versions.summoner}
          championImage={champion.image.full}
          championName={champion.name}
          summonerSpell1Image={summonerSpell1.image.full}
          summonerSpell2Image={summonerSpell2.image.full}
        />
        <Scoreboard assists={stats.assists} deaths={stats.deaths} kills={stats.kills} />
        <InfoGame
          champLevel={stats.champLevel}
          nbMinionsKilled={
            ((stats.neutralMinionsKilledEnemyJungle || 0) + stats.neutralMinionsKilledTeamJungle ||
              0) + stats.totalMinionsKilled || 0
          }
          actualRank={highestAchievedSeasonTier}
          killParticipation={
            ((stats.kills + stats.assists) / getTeamEnemyTotalDeath(matchDetail, teamId)) * 100
          }
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
          itemVersion={versions.item}
        />
        <Participants
          championVersion={versions.champion}
          myTeamId={teamId}
          participants={(Object.values(matchDetail.participants): any)}
          participantIdentities={(Object.values(matchDetail.participantIdentities): any)}
        />
        <Expand
          isCollapse={displayDetails}
          isWin={isWin}
          onClick={() => setDisplayDetails(!displayDetails)}
        >
          <ArrowRight height={16} width={16} />
        </Expand>
      </Wrapper>
      {displayDetails && <MatchDetails matchDetail={matchDetail} isWin={isWin} />}
    </>
  )
}

export default React.memo<Props>(MatchRow)
