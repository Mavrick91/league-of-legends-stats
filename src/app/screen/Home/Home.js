// @flow

import TextFieldInput from 'app/components/TextField'
import banner from 'app/ressources/images/banner_home.png'
import React from 'react'
import { useCookies } from 'react-cookie'
import type { formPropTypes } from 'redux-form'
import { Form } from 'redux-form'
import styled, { css } from 'styled-components'
import ListPlayers from './ListPlayers'
import Tabs from './Tabs'

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.purple};
    height: 100%;
  `}
`

const Container = styled.div`
  width: 624px;
  text-align: center;
`

const Banner = styled.img`
  height: 83px;
  margin: 32px 0;
`

const Shadow = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`

const InputStyled = styled(TextFieldInput)`
  &&& {
    ${({ theme: { colors } }) => css`
      height: 50px;
      width: 100%;
      background: ${colors.white};
      padding: 15px 150px 18px 17px;
      border: none;
      line-height: 17px;
      font-size: 14px;
      color: ${colors.white6};
      outline: none;
    `}
  }
`

export const separator = '-_-'

function Home({ handleSubmit, history }: formPropTypes) {
  const [cookies, setCookie] = useCookies()
  const [activeTab, setActiveTab] = React.useState(0)
  const [showList, setShowList] = React.useState(false)
  const [players, setPlayers] = React.useState([])
  const shadowRef = React.useRef(null)

  React.useEffect(() => {
    let allPLayers = []

    if (activeTab === 0) allPLayers = (cookies.recentPlayers || '').split(separator)
    else allPLayers = (cookies.favoritePlayers || '').split(separator)

    allPLayers.pop()

    setPlayers(allPLayers.filter(Boolean).reverse())
  }, [cookies.recentPlayers, cookies.favoritePlayers, activeTab])

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (shadowRef.current && !shadowRef.current.contains(event.target)) {
      setShowList(false)
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  function onSubmit(value) {
    if (players.length <= 9 && !players.includes(value.summonerName))
      setCookie('recentPlayers', `${cookies.recentPlayers || ''}${value.summonerName}${separator}`)

    history.push(`/dashboard/${value.summonerName}`)
  }

  return (
    <Wrapper>
      <Container>
        <Banner src={banner} />
        <Shadow ref={shadowRef}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputStyled
              name="summonerName"
              placeholder="Summoner name ..."
              autoComplete="off"
              onFocus={() => setShowList(true)}
            />
          </Form>
          {showList && (
            <>
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <ListPlayers activeTab={activeTab} players={players} separator={separator} />
            </>
          )}
        </Shadow>
      </Container>
    </Wrapper>
  )
}

export default Home
