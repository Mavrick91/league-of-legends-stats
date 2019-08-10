// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import Info from 'app/ressources/images/svg/info'
import Star from 'app/ressources/images/svg/star'
import Clear from 'app/ressources/images/svg/clear'
import { useCookies } from 'react-cookie'

type Props = {
  players: Array<string>,
  separator: string,
  activeTab: number,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    min-height: 56px;
    background-color: ${colors.white};
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    display: flex;
  `}
`

const NoRecent = styled.div`
  ${({ theme: { colors } }) => css`
    padding: 20px;
    line-height: 15px;
    font-size: 12px;
    color: ${colors.black15};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    & > :first-child {
      margin-right: 8px;
    }
  `}
`

const Recent = styled.div`
  padding: 5px 20px 20px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const LinkStyled = styled(Link)`
  ${({ theme: { colors } }) => css`
    width: 200px;
    margin-top: 15px;
    padding-left: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${colors.black15};
    text-decoration: none;

    & > :first-child {
      cursor: pointer;
    }
    & > :nth-child(2) {
      cursor: pointer;
    }
  `}
`

function ListPlayers({ players, separator, activeTab }: Props) {
  const [cookies, setCookie] = useCookies()

  function removePlayerFromCookies(player) {
    const cookieName = activeTab === 0 ? 'recentPlayers' : 'favoritePlayers'

    setCookie(cookieName, cookies[cookieName].replace(`${player}${separator}`, ''))
  }

  const noRecent =
    activeTab === 0 ? (
      <>
        <Info height={16} width={16} fill="#666" />
        There is no summoner you have seen recently.
      </>
    ) : (
      <>
        <Info height={16} width={16} fill="#666" />
        <span>Add your </span>
        <Star height={16} width={16} fill="#666" />
        <span> favorite summoner for easy updates on the latest stats.</span>
      </>
    )

  return (
    <Wrapper>
      {players.length === 0 ? (
        <NoRecent>{noRecent}</NoRecent>
      ) : (
        <Recent>
          {players.map(player => (
            <LinkStyled key={player} to={`/dashboard/${player}`}>
              <span>{player}</span>
              <Clear height={16} width={16} onClick={() => removePlayerFromCookies(player)} />
            </LinkStyled>
          ))}
        </Recent>
      )}
    </Wrapper>
  )
}

export default ListPlayers
