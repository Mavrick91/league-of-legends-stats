// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import ProfileIcon from 'app/components/ProfileIcon'

type Props = {
  profileIconId: number,
  name: string,
  summonerLevel: number,
  tier: string,
}

const Wrapper = styled.div`
  display: flex;
`

const NameAndRank = styled.div`
  margin: 0 25px;
`

const Name = styled.div`
  ${({ theme: { colors } }) =>
    css`
      color: ${colors.black10};
      font-size: 20px;
      font-weight: bold;
      font-family: 'Helvetica Neue', serif;
    `}
`

const Rank = styled.div`
  ${({ theme: { colors } }) => css`
    color: ${colors.black11};
    font-size: 11px;
    text-decoration: none;
    line-height: 1.5;

    & > span {
      color: ${colors.blue4};
      font-weight: bold;
    }
  `}
`

function InformationSummoner({ profileIconId, name, summonerLevel, tier }: Props) {
  return (
    <Wrapper>
      <ProfileIcon profileIconId={profileIconId} summonerLevel={summonerLevel} tier={tier} />
      <NameAndRank>
        <Name>{name}</Name>
        <Rank>
          Rang Ladder
          <span> 1,611,592 </span>
          (68% meilleurs joueurs)
        </Rank>
      </NameAndRank>
    </Wrapper>
  )
}

export default React.memo<Props>(InformationSummoner)
