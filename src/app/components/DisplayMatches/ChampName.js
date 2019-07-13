// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import { CHAMPION_VERSION, SUMMONER_VERSION } from 'app/api/config'

type Props = {
  championImage: string,
  championName: string,
  summonerSpell1Image: string,
  summonerSpell2Image: string,
}

const ImageChampion = styled.img`
  height: 46px;
  width: 46px;
  border-radius: 50%;
`

const WrapperSummonerSpells = styled.div`
  display: flex;
  flex-direction: column;
  & > img {
    height: 22px;
    width: 22px;

    &:nth-child(2) {
      margin-top: 2px;
    }
  }
`

const Wrapper = styled.div`
  width: 78px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Champ = styled.div`
  display: flex;
  justify-content: space-between;
`

const Name = styled.div`
  ${({ theme: { colors } }) => css`
    font-size: 11px;
    color: ${colors.black13};
    text-align: center;
    margin-top: 8px;
  `}
`

function ChampName({
  championName,
  championImage,
  summonerSpell1Image,
  summonerSpell2Image,
}: Props) {
  return (
    <Wrapper>
      <Champ>
        <ImageChampion
          src={`https://ddragon.leagueoflegends.com/cdn/${CHAMPION_VERSION}/img/champion/${championImage}`}
        />
        <WrapperSummonerSpells>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${SUMMONER_VERSION}/img/spell/${summonerSpell1Image}`}
            alt=""
          />
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${SUMMONER_VERSION}/img/spell/${summonerSpell2Image}`}
            alt=""
          />
        </WrapperSummonerSpells>
      </Champ>
      <Name>{championName}</Name>
    </Wrapper>
  )
}

export default ChampName
