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
    `}
`

const Favorite = styled.div`
  font-size: 10px;
  color: #777;
  display: flex;
  align-items: center;
  font-weight: lighter;
  margin-left: 10px;
  cursor: pointer;
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
              <Star height={18} width={18} />
            ) : (
              <StarBorder height={18} width={18} />
            )}
            <span>Favoris</span>
          </Favorite>
        </Name>
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
