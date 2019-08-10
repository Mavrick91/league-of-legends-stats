// @flow

import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  history: {
    push: (*) => void,
  },
}

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
  text-decoration: underline;
  font-weight: lighter;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
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
  'EonisX',
  'Fettson',
  'regan',
  'Bastia',
]

function SummonerNotFound({ history }: Props) {
  function handleClick(summoner) {
    history.push(`/dashboard/${summoner}`)
  }

  return (
    <Wrapper>
      <span>
        {" Cet utilisateur n'est pas répertorié sur GG-WP. Veuillez vérifier l’orthographe."}
      </span>
      <SummonerContainer>
        {defaultSummoner.map(summoner => (
          <Summoner key={summoner} onClick={() => handleClick(summoner)}>
            {summoner}
          </Summoner>
        ))}
      </SummonerContainer>
    </Wrapper>
  )
}

export default React.memo<Props>(SummonerNotFound)
