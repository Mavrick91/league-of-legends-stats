// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import NumberFormat from 'react-number-format'

import { CHAMPION_VERSION } from 'app/api/config'
import { useSelector } from 'react-redux'
import { getChampionById } from 'app/service/summoner/selector'
import moment from 'moment'
import { getLevel } from 'app/utils/image'

type Props = {
  champion: Array<{}>,
  index: number,
}

const ImageChamp = styled.td`
  display: flex;
  align-items: center;
  & > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 8px 22px;
  }
`

const ImageLevel = styled.td`
  & > img {
    width: 52px;
    height: 52px;
  }
`

const LastTimePlayed = styled.td`
  text-align: left;
  padding-left: 30px;
`

const Wrapper = styled.tr`
  ${({ theme: { colors } }) => css`
    padding: 0 5px;
    color: ${colors.black11};
    text-align: center;
    height: 52px;
    border-bottom: 1px solid ${colors.white3};
    font-size: 12px;
    font-weight: bold;
    vertical-align: middle;
  `}
`

function Champions({ champion, index }: Props) {
  const champ = useSelector(state => getChampionById(state, champion.championId))

  return (
    <Wrapper>
      <td>{index}</td>
      <ImageChamp>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${CHAMPION_VERSION}/img/champion/${champ.image.full}`}
          alt="champion"
        />
        <span>{champ.name}</span>
      </ImageChamp>
      <LastTimePlayed>
        {moment(champion.lastPlayTime)
          .fromNow()
          .replace('il y a ', '')
          .replace('un', '1')}
      </LastTimePlayed>
      <NumberFormat
        value={champion.championPointsSinceLastLevel}
        displayType="text"
        thousandSeparator
        renderText={value => <td>{value}</td>}
      />
      <NumberFormat
        value={champion.championPoints}
        displayType="text"
        thousandSeparator
        renderText={value => <td>{value}</td>}
      />
      <ImageLevel>
        <img src={getLevel(champion.championLevel)} alt="" />
      </ImageLevel>
    </Wrapper>
  )
}

export default Champions
