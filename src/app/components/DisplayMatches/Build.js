// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import blueBourse from 'app/ressources/images/blue_bourse.png'
import redBourse from 'app/ressources/images/red_bourse.png'

type Props = {
  items: $ReadOnlyArray<{ id: number, item: number }>,
  isWin: boolean,
  itemVersion: number,
}

const Wrapper = styled.div`
  width: 114px;
  display: flex;
  align-items: center;
`

const Item = styled.img`
  height: 22px;
  width: 22px;
  margin-right: 2px;
  border-radius: 3px;
`

const EmptyItem = styled.div`
  ${({ theme: { colors } }) => css`
    display: inline-block;
    height: 22px;
    width: 22px;
    background: ${colors.black};
    opacity: 0.2;
    border-radius: 3px;
    margin-top: 2px;
    margin-right: 2px;
  `}
`

const Container = styled.div`
  text-align: center;
`

function Build({ items, isWin, itemVersion }: Props) {
  return (
    <Wrapper>
      <Container>
        {items.map(obj => {
          if (obj.item === 0) return <EmptyItem key={obj.id} />
          if (obj.id === 7) return <Item key={obj.id} src={`${isWin ? blueBourse : redBourse}`} />

          return (
            <Item
              key={obj.id}
              src={`http://ddragon.leagueoflegends.com/cdn/${itemVersion}/img/item/${obj.item}.png `}
            />
          )
        })}
      </Container>
    </Wrapper>
  )
}

export default Build
