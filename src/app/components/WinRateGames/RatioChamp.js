// @flow

import React from 'react'
import { has } from 'ramda'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { getAllChampionsSelector } from 'app/service/summoner/selector'
import { CHAMPION_VERSION } from 'app/api/config'

type Props = {
  matchDetails: Array<MatchDetailType>,
  summoner: {
    info: SummonerType,
  },
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 230px;
    justify-content: space-evenly;
    border-right: 1px solid ${colors.white3};
    margin-left: 16px;
  `}
`

const StatsChamp = styled.div`
  display: flex;
`

const ImageChamp = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`

const Name = styled.span`
  ${({ theme: { colors } }) => css`
    margin-bottom: 2px;
    line-height: 16px;
    font-size: 14px;
    color: ${colors.black9};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

const Stats = styled.div`
  ${({ isAboveSixty, isAboveThreeKda, theme: { colors } }) => css`
    display: inline-block;
    font-size: 11px;
    line-height: 12px;
    color: ${colors.black9};

    & > span:nth-child(1) {
      color: ${isAboveSixty ? colors.red : colors.black9};
      font-weight: bold;
    }

    & > span:nth-child(3) {
      color: ${isAboveThreeKda ? colors.green : colors.black9};
      font-weight: bold;
      margin-left: 15px;
    }
  `}
`

function RatioChamp({ matchDetails, summoner }: Props) {
  const [champions, setChampions] = React.useState({})
  const allChampions = useSelector(getAllChampionsSelector)

  React.useEffect(() => {
    const tmpStateChamp = matchDetails.reduce((acc, matchDetail) => {
      const { participantId: myParticipantId } = (matchDetail.participantIdentities.find(
        participantIdentity => participantIdentity.player.summonerId === summoner.info.id,
      ): any)
      const participant = (matchDetail.participants.find(
        item => item.participantId === myParticipantId,
      ): any)

      const champion = (Object.values(allChampions.data): any).find(
        c => c.key === participant.championId.toString(),
      )

      if (!has(champion.name, acc) && Object.keys(acc).length <= 2) acc[champion.name] = []
      if (has(champion.name, acc)) acc[champion.name].push(participant)
      return acc
    }, {})
    setChampions(tmpStateChamp)
  }, [allChampions.data, matchDetails, summoner.info.id])

  return (
    <Wrapper>
      {Object.keys(champions).map(key => {
        const values = champions[key]

        const { win, lost, kills, deaths, assists } = values.reduce(
          (acc, value) => ({
            win: value.stats.win ? acc.win + 1 : acc.win,
            lost: !value.stats.win ? acc.lost + 1 : acc.lost,
            kills: acc.kills + value.stats.kills,
            deaths: acc.deaths + value.stats.deaths,
            assists: acc.assists + value.stats.assists,
          }),
          { win: 0, lost: 0, kills: 0, deaths: 0, assists: 0 },
        )
        const kda = ((kills + assists) / deaths).toFixed(2)
        const kdaDisplay = kda === 'Infinity' ? 'Perfect ' : `${kda}`
        const champName = key.replace(/ /g, '').replace(/\./g, '').replace(/'/g, '')

        return (
          <StatsChamp key={key}>
            <ImageChamp
              src={`https://ddragon.leagueoflegends.com/cdn/${CHAMPION_VERSION}/img/champion/${champName}.png`}
            />
            <Content>
              <Name>{key}</Name>
              <Stats
                isAboveSixty={(win / (win + lost)) * 100 >= 60}
                isAboveThreeKda={kdaDisplay >= '3'}
              >
                <span>{`${((win / (win + lost)) * 100).toFixed(0)}%`}</span>
                <span>{` (${win}V ${lost}D)`}</span>
                <span>{`${kdaDisplay} KDA`}</span>
              </Stats>
            </Content>
          </StatsChamp>
        )
      })}
    </Wrapper>
  )
}

export default React.memo<Props>(RatioChamp)
