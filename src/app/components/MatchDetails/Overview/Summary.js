// @flow

import baronB from 'app/ressources/images/icons/icon-baron-b.png'
import baronR from 'app/ressources/images/icons/icon-baron-r.png'
import dragonB from 'app/ressources/images/icons/icon-dragon-b.png'
import dragonR from 'app/ressources/images/icons/icon-dragon-r.png'
import towerB from 'app/ressources/images/icons/icon-tower-b.png'
import towerR from 'app/ressources/images/icons/icon-tower-r.png'
import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  myTeam: TeamType,
  myParticipants: Array<{ summonerName: string } & ParticipantsType>,
  enemyTeam: TeamType,
  enemyParticipants: Array<{ summonerName: string } & ParticipantsType>,
}
const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 1px solid ${colors.white3};
    border-right: 1px solid ${colors.white3};
    background-color: ${colors.gray3};
  `}
`

const Team = styled.div`
  display: table-cell;
  height: 30px;
  vertical-align: middle;
  padding-right: 10px;
  text-align: right;
  line-height: 30px;

  &:first-child {
    padding-right: 0;
    padding-left: 10px;
    text-align: left;
    border-left: 1px solid transparent;
  }

  &:last-child {
    padding-right: 10px;
    border-right: 1px solid transparent;
    border-top: 1px solid transparent;
  }
`
const ObjectScore = styled.div`
  ${({ theme: { colors } }) => css`
    display: inline-block;
    font-size: 11px;
    color: ${colors.black13};

    & + & {
      margin-left: 10px;
    }

    img {
      display: inline-block;
      margin-right: 3px;
      vertical-align: middle;
      height: 16px;
    }
  `}
`

const SummaryGraph = styled.div`
  flex: 0 1 390px;
`

const TotalContainer = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    justify-content: center;
    font-size: 10px;
    color: ${colors.black20};

    &:first-child {
      padding: 8px 0;
    }

    &:last-child {
      padding-bottom: 8px;
    }
  `}
`

const GraphTitle = styled.div`
  text-align: left;
  width: 60px;
`

const TotalKills = styled.div`
  ${({ align }) => css`
    text-align: ${align};
    width: 40px;
  `}
`

const GraphContainer = styled.div`
  flex: 0 1 290px;
  display: flex;
  align-items: center;
  margin: 0 5px;
`

const GraphTeam = styled.div`
  ${({ flex, isWin, theme: { colors } }) => css`
    background-color: ${isWin ? colors.blue12 : colors.red10};
    height: 10px;
    flex: ${flex};
  `}
`

const Summary = ({ enemyTeam, myTeam, myParticipants, enemyParticipants }: Props) => {
  const myTeamTotalKills = myParticipants.reduce((acc, key) => acc + key.stats.kills, 0)
  const enemyTotalKills = enemyParticipants.reduce((acc, key) => acc + key.stats.kills, 0)
  const myTeamTotalGolds = myParticipants.reduce((acc, key) => acc + key.stats.goldEarned, 0)
  const enemyTotalGolds = enemyParticipants.reduce((acc, key) => acc + key.stats.goldEarned, 0)
  const isWin = myTeam.win === 'Win'

  const myDatasIcons =
    myTeam.win === 'Fail'
      ? [
        { image: baronR, value: myTeam.baronKills },
        { image: dragonR, value: myTeam.dragonKills },
        { image: towerR, value: myTeam.towerKills },
      ]
      : [
        { image: baronB, value: myTeam.baronKills },
        { image: dragonB, value: myTeam.dragonKills },
        { image: towerB, value: myTeam.towerKills },
      ]
  const enemyDatasIcons =
    enemyTeam.win !== 'Fail'
      ? [
        { image: baronB, value: enemyTeam.baronKills },
        { image: dragonB, value: enemyTeam.dragonKills },
        { image: towerB, value: enemyTeam.towerKills },
      ]
      : [
        { image: baronR, value: enemyTeam.baronKills },
        { image: dragonR, value: enemyTeam.dragonKills },
        { image: towerR, value: enemyTeam.towerKills },
      ]

  function displayTotalKillsGolds(myTeamData, enemyTeamData) {
    return (
      <>
        <TotalKills align="right">{myTeamData}</TotalKills>
        <GraphContainer>
          <GraphTeam flex={myTeamData} isWin={isWin} />
          <GraphTeam flex={enemyTeamData} isWin={!isWin} />
        </GraphContainer>
        <TotalKills align="left">{enemyTeamData}</TotalKills>
      </>
    )
  }

  return (
    <Wrapper>
      <Team>
        {myDatasIcons.map(data => (
          <ObjectScore key={data.image}>
            <img src={data.image} alt="" />
            {data.value}
          </ObjectScore>
        ))}
      </Team>
      <SummaryGraph>
        <TotalContainer>
          <GraphTitle>Total Kills</GraphTitle>
          {displayTotalKillsGolds(myTeamTotalKills, enemyTotalKills)}
        </TotalContainer>
        <TotalContainer>
          <GraphTitle>Total Golds</GraphTitle>
          {displayTotalKillsGolds(myTeamTotalGolds, enemyTotalGolds)}
        </TotalContainer>
      </SummaryGraph>
      <Team>
        {enemyDatasIcons.map(data => (
          <ObjectScore key={data.image}>
            <img src={data.image} alt="" />
            {data.value}
          </ObjectScore>
        ))}
      </Team>
    </Wrapper>
  )
}

export default Summary
