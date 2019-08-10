// @flow

import React from 'react'
import { Form } from 'redux-form'
import { useCookies } from 'react-cookie'
import styled, { css } from 'styled-components'
import type { formPropTypes } from 'redux-form'
import TextFieldInput from 'app/components/TextField'
import banner from 'app/ressources/images/banner_home.png'
import RecentPlayers from './RecentPlayers'

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.yellow1};
    height: 100%;
  `}
`

const Banner = styled.img`
  height: 83px;
  margin: 32px 0;
`

const InputStyled = styled(TextFieldInput)`
  &&& {
    ${({ theme: { colors } }) => css`
      height: 50px;
      width: 624px;
      background: ${colors.white};
      padding: 15px 150px 18px 17px;
      border: none;
      line-height: 17px;
      font-size: 14px;
      color: #9b9b9b;
      box-sizing: border-box;
      outline: none;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.19);
    `}
  }
`

function Home({ handleSubmit, history }: formPropTypes) {
  const [cookies, setCookie] = useCookies()
  const [showList, setShowList] = React.useState(false)
  const [recentPlayers, setRecentPlayer] = React.useState([])
  const separator = '$_$separator$_$'

  React.useEffect(() => {
    const allPlayer = (cookies.recentsPlayer || '').split(separator)
    allPlayer.pop()

    setRecentPlayer(allPlayer)
  }, [cookies.recentsPlayer])

  function onSubmit(value) {
    if (recentPlayers.length <= 9 && !recentPlayers.includes(value.summonerName))
      setCookie('recentsPlayer', `${cookies.recentsPlayer || ''}${value.summonerName}${separator}`)

    history.push(`/dashboard/${value.summonerName}`)
  }

  return (
    <Wrapper>
      <Banner src={banner} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputStyled
          name="summonerName"
          placeholder="Summoner name ..."
          autoComplete="off"
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
        />
      </Form>
      {showList && (
        <RecentPlayers players={recentPlayers.filter(Boolean).reverse()} separator={separator} />
      )}
    </Wrapper>
  )
}

export default Home
