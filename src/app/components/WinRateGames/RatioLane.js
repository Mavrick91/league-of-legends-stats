// @flow

import React from 'react'
import { isEmpty } from 'ramda'
import styled, { css } from 'styled-components'
import { getLane } from 'app/utils/image'
import { capitalize } from 'app/utils/string'

type Props = {
  matchDetails: Array<MatchDetailType>,
  matchLists: Array<MatchType>,
  summoner: SummonerType,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 188px;
    margin-left: 16px;
    padding-top: 16px;
    font-size: 12px;
    color: ${colors.black15};
  `}
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
`

const LaneStats = styled.span`
  display: flex;
`

const IconLane = styled.img`
  width: 31px;
  height: 31px;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4px;

  & > span:nth-child(1) {
    ${({ theme: { colors } }) => css`
      line-height: 16px;
      font-size: 14px;
      color: ${colors.black9};
    `}
  }
`

const PercentageWin = styled.div`
  ${({ theme: { colors } }) => css`
    line-height: 16px;
    margin-bottom: 4px;
    font-size: 11px;

    & > span:nth-child(1) {
      color: ${colors.yellow1};
    }

    & ~ :last-child {
      font-weight: bolder;
    }
  `}
`

function RatioLane({ matchDetails, matchLists, summoner }: Props) {
  const [mainLane, setMainLane] = React.useState(null)

  React.useEffect(() => {
    const matchPerLane = matchLists.reduce(
      (acc, match, index) => {
        if (match.lane === 'TOP') acc.top.push({ ...matchDetails[index], lane: 'top' })
        if (match.lane === 'JUNGLE') acc.jungle.push({ ...matchDetails[index], lane: 'jungle' })
        if (match.lane === 'MID') acc.mid.push({ ...matchDetails[index], lane: 'mid' })
        if (match.lane === 'BOTTOM' && match.role.includes('CARRY'))
          acc.bottom.push({ ...matchDetails[index], lane: 'bottom' })
        if (match.lane === 'BOTTOM' && match.role.includes('SUPPORT'))
          acc.support.push({ ...matchDetails[index], lane: 'support' })

        return acc
      },
      { top: [], jungle: [], mid: [], bottom: [], support: [] },
    )
    const [main, second] = (Object.values(matchPerLane): any).sort((a, b) => b.length - a.length)
    setMainLane([main, second])
  }, [matchDetails, matchLists])

  function getStats(acc, matchDetail) {
    const { participantId: myParticipantId } = (matchDetail.participantIdentities.find(
      participantIdentity => participantIdentity.player.summonerId === summoner.summonerIds.id,
    ): any)
    const { stats } = (matchDetail.participants.find(
      item => item.participantId === myParticipantId,
    ): any)

    return {
      lane: matchDetail.lane,
      win: stats.win ? acc.win + 1 : acc.win,
    }
  }

  return (
    <Wrapper>
      <span>Preferred Position (Rank)</span>
      {mainLane && (
        <Container>
          {mainLane.map((matches: Array<MatchDetailType>) => {
            if (isEmpty(matches)) return null

            const { lane, win } = matches.reduce(getStats, { lane: null, win: 0 })

            return (
              <LaneStats key={lane}>
                <IconLane src={getLane(lane)} />
                <Text>
                  <span>{capitalize(lane)}</span>
                  <PercentageWin>
                    <span>
                      <b>{`${(matches.length / matchDetails.length) * 100}%`}</b>
                    </span>
                    <span> | Win Ratio </span>
                    <b>{`${((win / matches.length) * 100).toFixed(0)}%`}</b>
                  </PercentageWin>
                </Text>
              </LaneStats>
            )
          })}
        </Container>
      )}
    </Wrapper>
  )
}

export default React.memo<Props>(RatioLane)
