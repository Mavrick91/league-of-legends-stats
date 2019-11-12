// @flow

import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  championVersion: number,
  summonerVersion: number,
  championImage: string,
  championName?: string,
  champLevel?: number,
  summonerSpell1Image: string,
  summonerSpell2Image: string,
}

const ImageChampion = styled.img`
  height: 100%;
  border-radius: 50%;
  margin-right: 4px;
`

const WrapperSummonerSpells = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > img {
    height: calc(96% / 2);

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
  height: 46px;
  position: relative;
`

const Name = styled.div`
  ${({ theme: { colors } }) => css`
    font-size: 11px;
    color: ${colors.black13};
    text-align: center;
    margin-top: 8px;
  `}
`

const ChampLevelStyled = styled.div`
  ${({ theme: { colors } }) => css`
    position: absolute;
    left: -3px;
    bottom: -3px;
    width: 15px;
    height: 15px;
    color: ${colors.gray2};
    font-size: 10px;
    text-align: center;
    line-height: 15px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
  `}
`

function ChampName({
  championName,
  championImage,
  summonerSpell1Image,
  summonerSpell2Image,
  championVersion,
  summonerVersion,
  champLevel,
}: Props) {
  return (
    <Wrapper>
      <Champ>
        <ImageChampion
          src={`https://ddragon.leagueoflegends.com/cdn/${championVersion}/img/champion/${championImage}`}
        />
        <WrapperSummonerSpells>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${summonerVersion}/img/spell/${summonerSpell1Image}`}
            alt=""
          />
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${summonerVersion}/img/spell/${summonerSpell2Image}`}
            alt=""
          />
        </WrapperSummonerSpells>
        {champLevel && <ChampLevelStyled>{champLevel}</ChampLevelStyled>}
      </Champ>
      {championName && <Name>{championName}</Name>}
    </Wrapper>
  )
}

export default ChampName
