// @flow

import { getVersionsSelector } from 'app/service/staticData/selector'
import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

type Props = {
  profileIconId: number,
  summonerLevel: number,
  tier: string,
}

const WrapperImage = styled.div`
  position: relative;
`

const Border = styled.div`
  position: absolute;
  left: -10px;
  top: -10px;
  width: 120px;
  height: 120px;
  ${({ tier }) => css`
    background-image: url("https://opgg-static.akamaized.net/images/borders2/${tier.toLowerCase()}.png");
  `}
`

const SummonerLevel = styled.span`
  ${({ theme: { colors } }) => css`
    position: absolute;
    bottom: -10px;
    transform: translateX(-50%);
    left: 50%;
    text-align: center;
    background-image: url('https://opgg-static.akamaized.net/images/site/summoner/bg-levelbox.png');
    width: 44px;
    height: 24px;
    line-height: 24px;
    color: ${colors.yellow};
    font-size: 14px;
    font-family: 'Helvetica', serif;
  `}
`

const Icon = styled.img`
  display: block;
  width: 100px;
  height: 100px;
`

function ProfileIcon({ profileIconId, summonerLevel, tier }: Props) {
  const versions = useSelector(getVersionsSelector)

  return (
    <WrapperImage>
      {tier && <Border data-test="border" tier={tier} />}
      <Icon
        src={`https://ddragon.leagueoflegends.com/cdn/${versions.profileicon}/img/profileicon/${profileIconId}.png`}
        alt="Profile icon summoner"
        data-test="icon"
      />
      <SummonerLevel>{summonerLevel}</SummonerLevel>
    </WrapperImage>
  )
}

export default ProfileIcon
