// @flow

import { getChampionById } from 'app/service/staticData/selector'
import { getSummonerEntitySelector } from 'app/service/summoner/selector'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

type Props = {
  championVersion: number,
  championId: number,
  player: PlayerType,
}

const Wrapper = styled.div`
  width: 96px;
  height: 18px;
`

const ImageChampion = styled.div`
  ${({ imageChampion, isRounded, championVersion }) => css`
  background-image: url("https://ddragon.leagueoflegends.com/cdn/${championVersion}/img/champion/${imageChampion}");
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

function ParticipantRow({ championId, player, championVersion }: Props) {
  const champion = useSelector(state => getChampionById(state, championId))
  const summoner = useSelector(getSummonerEntitySelector)

  return (
    <Link to={`/dashboard/${player.summonerName}`}>
      <Wrapper>
        <ImageChampion
          championVersion={championVersion}
          isRounded={summoner.info.name === player.summonerName}
          imageChampion={champion.image.full}
        />
        <SummonerName>{player.summonerName}</SummonerName>
      </Wrapper>
    </Link>
  )
}

export default ParticipantRow
