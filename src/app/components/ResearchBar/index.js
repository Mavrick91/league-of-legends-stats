// @flow

import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  history: { push: (*) => void },
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    height: 48px;
    background-color: ${colors.purple};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
  `}
`

const InputStyled = styled.input`
  ${({ theme: { colors } }) => css`
    border: none;
    padding: 9px 42px 8px 14px;
    font-size: 12px;
    line-height: 15px;
    color: ${colors.black16};
    outline: none;
    box-sizing: border-box;
    border-radius: 4px;
  `}
`

function ResearchBar({ history }: Props) {
  const [summonerName, setSummonerName] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    history.push(`/dashboard/${summonerName}`)
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <InputStyled
          type="text"
          placeholder="Summoner name"
          onChange={e => setSummonerName(e.target.value)}
        />
      </form>
    </Wrapper>
  )
}

export default ResearchBar
