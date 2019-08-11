// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

type Props = {}

const Wrapper = styled.h2`
  ${({ theme: { colors } }) => css`
    color: ${colors.black10};
    font-size: 26px;
    display: flex;
    align-items: center;
    padding-top: 100px;
    flex-direction: column;

    & > :first-child {
      margin-bottom: 50px;
    }
  `}
`

const SummonerContainer = styled.div`
  width: 600px;
  height: 314px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const Summoner = styled.div`
  margin: 13px 0;
  font-weight: lighter;
  cursor: pointer;
`

const LinkStyled = styled(Link)`
  ${({ theme: { colors } }) => css`
    text-decoration: none;
    color: ${colors.black14};
  `}
`

const defaultSummoner = [
  'LL Cage',
  'chosin',
  'Owies',
  'Zat',
  'og312',
  'Petetight',
  'Rebourn',
  'Aman11',
  'dat adc tho',
  'Pain',
  'Dessue',
  'JustRiri',
  'Fettson',
  'regan',
  'Bastia',
]

function SummonerNotFound() {
  return (
    <Wrapper>
      <span>
        {" Cet utilisateur n'est pas répertorié sur GG-WP. Veuillez vérifier l’orthographe."}
      </span>
      <SummonerContainer>
        {defaultSummoner.map(summoner => (
          <LinkStyled key={summoner} to={`/dashboard/${summoner}`}>
            <Summoner>{summoner}</Summoner>
          </LinkStyled>
        ))}
      </SummonerContainer>
    </Wrapper>
  )
}

export default React.memo<Props>(SummonerNotFound)
