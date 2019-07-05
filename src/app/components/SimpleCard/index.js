// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import BasicContainer from 'app/components/BasicContainer'
import { getWinRate, romanToInt } from 'app/utils/number'
import { capitalize } from 'app/utils/string'
import { getEmblem } from 'app/utils/image'

type Props = {
  showLeague: boolean,
  imageSize: 'md' | 'sm',
  leaguePoints: string,
  losses: string,
  leagueName: string,
  rank: string,
  title: string,
  tier: string,
  wins: string,
}

const Wrapper = styled.div`
  ${({ imageSize, theme: { colors } }) => css`
    display: flex;
    align-items: center;
    ${imageSize === 'sm' ? 'padding: 12px 0' : 'padding: 18px 0'};
    color: ${colors.black12};
  `}
`

const Emblem = styled.div`
  ${({ imageSize }) => css`
    height: ${imageSize === 'md' ? '104px' : '64px'};
    width: ${imageSize === 'md' ? '104px' : '64px'};
    ${imageSize === 'sm' ? 'margin: 0 38px' : 'margin: 0 18px'};
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      width: 100%;
    }
  `}
`

const Info = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;

  & > div {
    line-height: 1.5;
  }
`

const RankedType = styled.div`
  ${({ theme: { colors } }) => css`
    font-size: 11px;
    color: ${colors.black12};
  `}
`

const Rank = styled.div`
  ${({ theme: { colors } }) => css`
    font-size: 15px;
    font-weight: bold;
    color: ${colors.blue};
  `}
`

const LeaguePoint = styled.div`
  ${({ theme: { colors } }) => css`
    & > span:nth-child(1) {
      color: ${colors.black11};
      font-weight: bold;
    }
  `}
`

const Unranked = styled.div`
  font-size: 15px;
  font-weight: bold;
`

function SimpleCard({
  showLeague = true,
  imageSize = 'md',
  leaguePoints,
  losses,
  leagueName,
  rank,
  title,
  tier,
  wins,
}: Props) {
  const image = getEmblem(tier)

  return (
    <BasicContainer>
      <Wrapper imageSize={imageSize}>
        <Emblem imageSize={imageSize}>
          <img src={image} alt="emblem rank summoner" />
        </Emblem>
        <Info>
          <RankedType>{title}</RankedType>
          {tier && (
            <>
              <Rank>{`${capitalize(tier, true)} ${romanToInt(rank)}`}</Rank>
              <LeaguePoint>
                <span>{`${leaguePoints} LP`}</span>
                <span>{` / ${wins}V ${losses}D`}</span>
              </LeaguePoint>
              <div>{`Win Rate ${getWinRate(wins, losses)}%`}</div>
              {showLeague && <div>{leagueName}</div>}
            </>
          )}
          {!tier && <Unranked>Unranked</Unranked>}
        </Info>
      </Wrapper>
    </BasicContainer>
  )
}

export default SimpleCard
