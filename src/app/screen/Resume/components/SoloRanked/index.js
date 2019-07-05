// @flow

import React from 'react'
import styled from 'styled-components'
import BasicContainer from 'app/components/BasicContainer'
import { SummonerContext } from 'app/screen/Dashboard/Dashboard'
import { getWinRatio, romanToInt } from 'app/utils/number'
import { capitalize } from 'app/utils/string'

const Wrapper = styled.div`
  display: flex;
  color: #879292;
`

const Emblem = styled.div`
  width: 104px;
  height: 104px;

  & > img {
    height: 100%;
  }
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
  font-size: 11px;
  color: #879292;
`

const Rank = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #1f8ecd;
`

const LeaguePoint = styled.div`
  & > span:nth-child(1) {
    color: #555e5e;
    font-weight: bold;
  }
`

const Unranked = styled.div`
  font-size: 15px;
  font-weight: bold;
`

function SoloRanked() {
  const summoner = React.useContext(SummonerContext)
  const [image, setImage] = React.useState(null)

  React.useEffect(() => {
    if (summoner.tier)
      import(
        `app/ressources/images/emblems/${summoner.tier.toLowerCase()}.png`
      ).then(module => setImage(module.default))
    else
      import('app/ressources/images/default.png').then(module =>
        setImage(module.default),
      )
  }, [summoner])

  return (
    <BasicContainer>
      <Wrapper>
        <Emblem>
          <img src={image} alt="emblem rank summoner" />
        </Emblem>
        <Info>
          <RankedType>Classé Solo</RankedType>
          {summoner.tier && (
            <>
              <Rank>
                {`${capitalize(summoner.tier, true)} ${romanToInt(
                  summoner.rank,
                )}`}
              </Rank>
              <LeaguePoint>
                <span>{`${summoner.leaguePoints} LP`}</span>
                <span>{` / ${summoner.wins}V ${summoner.losses}D`}</span>
              </LeaguePoint>
              <div>
                {`Win Ratio ${getWinRatio(summoner.wins, summoner.losses)}%`}
              </div>
              <div>{summoner.leagueName}</div>
            </>
          )}
          {!summoner.tier && <Unranked>Unranked</Unranked>}
        </Info>
      </Wrapper>
    </BasicContainer>
  )
}

export default SoloRanked
