// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import { capitalize } from 'app/utils/string'

type Props = {
  champLevel: string,
  nbMinionsKilled: string,
  actualRank: string,
  killParticipation: string,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    font-size: 11px;
    color: ${colors.black11};
    align-items: center;
    justify-content: center;
    width: 90px;

    & > span {
      line-height: 18px;
    }
  `}
`

const KillParticipation = styled.span`
  ${({ theme: { colors } }) => css`
    color: ${colors.red};
  `}
`

const Rank = styled.span`
  ${({ theme: { colors } }) => css`
    color: ${colors.black14};
    font-weight: bold;
  `}
`

function InfoGame({ champLevel, actualRank, nbMinionsKilled, killParticipation }: Props) {
  return (
    <Wrapper>
      <span>{`Niveau ${champLevel}`}</span>
      <span>{`${nbMinionsKilled} CS`}</span>
      <KillParticipation>{`C/Tués ${Math.round(killParticipation)}%`}</KillParticipation>
      <span>Tier Average</span>
      <Rank>{`${capitalize(actualRank, true)}`}</Rank>
    </Wrapper>
  )
}

export default InfoGame
