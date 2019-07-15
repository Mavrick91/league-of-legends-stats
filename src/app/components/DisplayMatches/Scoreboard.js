// @flow

import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  kills: number,
  deaths: number,
  assists: number,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    font-size: 15px;
    font-weight: bold;
    color: ${colors.black11};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 113px;
    justify-content: center;
  `}
`

const Deaths = styled.span`
  ${({ theme: { colors } }) => css`
    color: ${colors.red};
  `}
`

const Kda = styled.div`
  font-size: 12px;
  margin-top: 6px;

  & > span:first-child {
    ${({ theme: { colors } }) => css`
      color: ${colors.black14};
    `}
  }
`

function Scoreboard({ kills, deaths, assists }: Props) {
  const kda = ((kills + assists) / deaths).toFixed(2)
  const kdaDisplay = kda === 'Infinity' ? 'Perfect ' : `${kda}: 1 `

  return (
    <Wrapper>
      <span>
        <span>{`${kills} / `}</span>
        <Deaths>{deaths}</Deaths>
        <span>{` / ${assists}`}</span>
      </span>
      <Kda>
        <span>{kdaDisplay}</span>
        <span>KDA</span>
      </Kda>
    </Wrapper>
  )
}

export default Scoreboard
