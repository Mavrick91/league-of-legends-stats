// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import Info from 'app/ressources/images/svg/info'
import Clear from 'app/ressources/images/svg/clear'
import { useCookies } from 'react-cookie'

type Props = {
  players: Array<string>,
  separator: string,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    min-height: 56px;
    background-color: ${colors.white};
    width: 624px;
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    display: flex;
  `}
`

const NoRecent = styled.div`
  padding: 20px;
  line-height: 15px;
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > :first-child {
    margin-right: 8px;
  }
`

const Recent = styled.div`
  padding: 5px 20px 20px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.div`
  ${({ theme: { colors } }) => css`
    width: 200px;
    margin-top: 15px;
    padding-left: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${colors.black15};

    & > :first-child {
      cursor: pointer;
    }
    & > :nth-child(2) {
      cursor: pointer;
    }
  `}
`

function RecentPlayers({ players, separator }: Props) {
  const [cookies, setCookie] = useCookies()

  function removePlayerFromCookies(player) {
    setCookie('recentsPlayer', cookies.recentsPlayer.replace(`${player}${separator}`, ''))
  }

  return (
    <Wrapper>
      {players.length === 0 ? (
        <NoRecent>
          <Info height={16} width={16} fill="#666" />
          There is no summoner you have seen recently.
        </NoRecent>
      ) : (
        <Recent>
          {players.map(player => (
            <Item key={player}>
              <span>{player}</span>
              <Clear height={16} width={16} onClick={() => removePlayerFromCookies(player)} />
            </Item>
          ))}
        </Recent>
      )}
    </Wrapper>
  )
}

export default RecentPlayers
