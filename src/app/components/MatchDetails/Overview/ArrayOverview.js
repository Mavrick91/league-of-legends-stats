// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import ArrayOverviewRow from './ArrayOverviewRow'
import {
  TdAvatar,
  TdDamage,
  TdItems,
  TdKda,
  TdMinion,
  TdName,
  TdRank,
  TdWards,
} from './ArrayOverviewRow.styled'

type Props = {
  participants: Array<{ summonerName: string } & ParticipantsType>,
  team: TeamType,
  matchDetail: MatchDetailType,
  maxDamageDealt: number,
}

const Wrapper = styled.div``

const TableStyled = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
`
const TheadStyled = styled.thead`
  ${({ theme: { colors } }) => css`
    border: solid 1px ${colors.white3};
    background-color: ${colors.white};

    & > tr:first-child {
      height: 35px;
    }
  `}
`

const ColGroup = styled.colgroup`
  ${TdAvatar} {
    width: 63px;
  }
  ${TdName} {
    width: 87px;
  }
  ${TdRank} {
    width: 65px;
  }
  ${TdKda} {
    width: 76px;
  }
  ${TdDamage} {
    width: 66px;
  }
  ${TdWards} {
    width: 48px;
  }
  ${TdMinion} {
    width: 55px;
  }
  ${TdItems} {
    width: 170px;
  }
`
const TbodyStyled = styled.tbody`
  ${({ theme: { colors }, isWin }) => css`
    background-color: ${isWin ? colors.blue9 : colors.red8};
    border: solid 1px ${isWin ? colors.blue10 : colors.red9};
  `}
`
const ThStyled = styled.th`
  ${({ theme: { colors } }) => css`
    height: 32px;
    color: ${colors.black11};
    font-size: 12px;
    font-weight: normal;
  `}
`

const ArrayOverview = ({ participants, team, matchDetail, maxDamageDealt }: Props) => {
  const isWin = team.win === 'Win'

  return (
    <Wrapper>
      <TableStyled>
        <TheadStyled>
          <tr>
            <ThStyled colSpan={2}>{isWin ? 'Victory' : 'Defeat'}</ThStyled>
            <ThStyled>Tier</ThStyled>
            <ThStyled>KDA</ThStyled>
            <ThStyled>Damages</ThStyled>
            <ThStyled>Wards</ThStyled>
            <ThStyled>CS</ThStyled>
            <ThStyled>Items</ThStyled>
          </tr>
        </TheadStyled>
        <ColGroup>
          <TdAvatar as="col" />
          <TdName as="col" />
          <TdRank as="col" />
          <TdKda as="col" />
          <TdDamage as="col" />
          <TdWards as="col" />
          <TdMinion as="col" />
          <TdItems as="col" />
        </ColGroup>
        <TbodyStyled isWin={isWin}>
          {participants.map(p => (
            <ArrayOverviewRow
              key={p.summonerName}
              participant={p}
              matchDetail={matchDetail}
              maxDamageDealt={maxDamageDealt}
              isWin={isWin}
            />
          ))}
        </TbodyStyled>
      </TableStyled>
    </Wrapper>
  )
}

export default ArrayOverview
