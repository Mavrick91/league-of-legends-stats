// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import { useCookies } from 'react-cookie'
import ProfileIcon from 'app/components/ProfileIcon'
import Star from 'app/ressources/images/svg/star'
import StarBorder from 'app/ressources/images/svg/star_border'
import { separator } from 'app/screen/Home/Home'

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
      display: flex;
      margin-bottom: 3px;
    `}
`

const Favorite = styled.div`
  ${({ theme: { colors } }) => css`
    font-size: 10px;
    color: ${colors.black19};
    display: flex;
    align-items: center;
    font-weight: lighter;
    margin-left: 10px;
    cursor: pointer;
    border: 1px solid ${colors.white5};
    padding: 3px 5px;

    & > :nth-child(2) {
      margin-left: 4px;
    }
  `}
`

const Rank = styled.div`
  ${({ theme: { colors } }) => css`
    color: ${colors.black11};
    font-size: 11px;
    text-decoration: none;
    line-height: 1.5;

    & > span {
      color: ${colors.purple};
      font-weight: bold;
    }
  `}
`

function InformationSummoner({ profileIconId, name, summonerLevel, tier }: Props) {
  const [cookies, setCookie] = useCookies()

  function isFavoritePlayer() {
    return !!(cookies.favoritePlayers || '').includes(name)
  }

  function toggleFavorite() {
    const cookieName = 'favoritePlayers'

    if (isFavoritePlayer())
      setCookie(cookieName, cookies.favoritePlayers.replace(`${name}${separator}`, ''), {
        path: '/',
      })
    else
      setCookie(cookieName, `${cookies.favoritePlayers || ''}${name}${separator}`, {
        path: '/',
      })
  }

  return (
    <Wrapper>
      <ProfileIcon profileIconId={profileIconId} summonerLevel={summonerLevel} tier={tier} />
      <NameAndRank>
        <Name>
          {name}
          <Favorite onClick={() => toggleFavorite()}>
            {isFavoritePlayer() ? (
              <Star height={18} width={18} fill="#7F7EFF" />
            ) : (
              <StarBorder height={18} width={18} fill="#7F7EFF" />
            )}
            <span>Favoris</span>
          </Favorite>
        </Name>
        <Rank>
          Rang Ladder
          <span> 1,611,592 </span>
          (68% best players)
        </Rank>
      </NameAndRank>
    </Wrapper>
  )
}

export default React.memo<Props>(InformationSummoner)
