// @flow

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import styled, { css } from 'styled-components'

type Props = {
  matchDetails: Array<MatchDetailType>,
  summoner: SummonerType,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    height: 100%;
    width: 272px;
    justify-content: space-evenly;
    border-right: 1px solid ${colors.white3};
  `}
`

const GamesDonut = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Donut = styled.div`
  height: 90px;
  width: 90px;
`

const Games = styled.span`
  ${({ theme: { colors } }) => css`
    padding: 16px 0 14px 20px;
    line-height: 14px;
    font-size: 12px;
    color: ${colors.black15};
  `}
`

const WrapperKda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Kda = styled.div`
  ${({ theme: { colors } }) => css`
    color: ${colors.black11};
    font-size: 11px;
    line-height: 12px;
    font-weight: bold;

    & > span:nth-child(2) {
      color: ${colors.red};
    }
  `}
`

const KillParticipation = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    margin-top: 10px;

    & > span:nth-child(1) {
      color: ${colors.black14};
    }

    & > span:nth-child(2) {
      color: ${colors.red};
    }
  `}
`

function RatioGame({ matchDetails, summoner }: Props) {
  function getTeamEnemyTotalDeath(matchDetail, myTeamId): number {
    return (Object.values(matchDetail.participants): any).reduce((acc, key) => {
      if (key.teamId === myTeamId) return acc

      return acc + key.stats.deaths
    }, 0)
  }

  function extractValueFromMatches() {
    return matchDetails.reduce(
      (acc, matchDetail) => {
        const { participantId: myParticipantId } = (matchDetail.participantIdentities.find(
          participantIdentity => participantIdentity.player.summonerId === summoner.id,
        ): any)
        const participant = (matchDetail.participants.find(
          item => item.participantId === myParticipantId,
        ): any)

        acc.enemyTotalDeaths += getTeamEnemyTotalDeath(matchDetail, participant.teamId)
        acc.nbWin = participant.stats.win ? acc.nbWin + 1 : acc.nbWin
        acc.nbAssists += participant.stats.assists
        acc.nbKills += participant.stats.kills
        acc.nbDeaths += participant.stats.deaths

        return acc
      },
      {
        enemyTotalDeaths: 0,
        nbWin: 0,
        nbAssists: 0,
        nbKills: 0,
        nbDeaths: 0,
      },
    )
  }

  const { enemyTotalDeaths, nbWin, nbAssists, nbKills, nbDeaths } = extractValueFromMatches()
  const nbGames = matchDetails.length
  const nbLose = nbGames - nbWin
  const kda = ((nbKills + nbAssists) / nbDeaths).toFixed(2)
  const kdaDisplay = kda === 'Infinity' ? 'Perfect ' : `${kda}: 1 `
  const killParticipation = ((nbKills + nbAssists) / enemyTotalDeaths) * 100
  const data = {
    height: 10,
    width: 10,
    legend: {
      display: false,
    },
    data: {
      labels: ['Loose', 'Win'],
      datasets: [
        {
          data: [nbLose, nbWin],
          backgroundColor: ['#ee5a52', '#1f8ecd'],
          hoverBackgroundColor: ['#ee5a52', '#1f8ecd'],
        },
      ],
    },
  }

  return (
    <Wrapper>
      <GamesDonut>
        <Games>{`${matchDetails.length}P ${nbWin}V ${nbLose}D`}</Games>
        <Donut>
          <Doughnut {...data} />
        </Donut>
      </GamesDonut>
      <WrapperKda>
        <Kda>
          <span>{`${nbKills / nbGames} / `}</span>
          <span>{`${nbDeaths / nbGames}`}</span>
          <span>{` / ${nbAssists / nbGames}`}</span>
        </Kda>
        <KillParticipation>
          <span>{kdaDisplay}</span>
          <span>{` (${Math.round(killParticipation)}%)`}</span>
        </KillParticipation>
      </WrapperKda>
    </Wrapper>
  )
}

export default RatioGame
