// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { getChampionById, getSummonerSelector } from 'app/service/summoner/selector'
import { CHAMPION_VERSION } from 'app/api/config'

type Props = {
  championId: *,
  player: *,
}

const Wrapper = styled.div`
  width: 96px;
  height: 18px;
`

const ImageChampion = styled.div`
  ${({ imageChampion, isRounded }) => css`
  background-image: url("https://ddragon.leagueoflegends.com/cdn/${CHAMPION_VERSION}/img/champion/${imageChampion}");
  background-size: contain;
  display: inline-block;
  height: 16px;
  width: 16px;
  ${isRounded && 'border-radius: 50%'}
`}
`

const SummonerName = styled.span`
  ${({ theme: { colors } }) => css`
    display: inline-block;
    max-width: 60px;
    vertical-align: middle;
    font-size: 11px;
    color: ${colors.black13};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 4px;
  `}
`

function ParticipantRow({ championId, player }: Props) {
  const champion = useSelector(state => getChampionById(state, championId))
  const summoner = useSelector(getSummonerSelector)

  return (
    <Wrapper>
      <ImageChampion
        isRounded={summoner.name === player.summonerName}
        imageChampion={champion.image.full}
      />
      <SummonerName>{player.summonerName}</SummonerName>
    </Wrapper>
  )
}

export default ParticipantRow
