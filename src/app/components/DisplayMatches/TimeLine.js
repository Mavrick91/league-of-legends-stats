// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import 'moment/locale/fr'
import { getGameMode } from 'app/utils/gameMode'

type Props = {
  isWin: boolean,
  duration: number,
  createdDuration: number,
  gameMode: string,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    font-size: 11px;
    display: flex;
    flex-direction: column;
    color: ${colors.black13};
    width: 80px;
    align-items: center;
    justify-content: center;
  `}
`

const Win = styled.span`
  ${({ isWin, theme: { colors } }) => css`
    color: ${isWin ? colors.blue3 : colors.red};
    font-weight: bold;
  `}
`
const Separator = styled.div`
  ${({ isWin, theme: { colors } }) => css`
    background: ${isWin ? colors.blue2 : colors.red2};
    display: block;
    width: 27px;
    margin: 5px auto;
    height: 2px;
  `}
`

const GameMode = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
`

function Timeline({ isWin, duration, createdDuration, gameMode }: Props) {
  const momentDuration = moment.duration(duration, 'seconds')

  return (
    <Wrapper>
      <GameMode>{getGameMode(gameMode)}</GameMode>
      <span>
        {moment(createdDuration)
          .locale('fr')
          .fromNow()}
      </span>
      <Separator isWin={isWin} />
      <Win isWin={isWin}>{isWin ? 'Victoire' : 'Défaite'}</Win>
      {`${momentDuration.minutes()}:${momentDuration.seconds()}`}
    </Wrapper>
  )
}

export default Timeline
