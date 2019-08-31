// @flow

import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  activeTab: number,
  setActiveTab: number => void,
}

const Wrapper = styled.div`
  margin-top: 25px;
`

const Line = styled.div`
  width: 100vw;
  border-bottom: 1px solid rgb(198, 203, 203);
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  display: flex;
  margin-top: -1px;
`

const WrapperItem = styled.div`
  display: flex;
  z-index: 10;
  position: relative;
`

const Item = styled.div`
  ${({ isActive, theme: { colors } }) => css`
    height: 41px;
    padding: 0 6px;
    display: block;
    min-width: 70px;
    border: 1px solid ${colors.white5};
    border-bottom: 1px solid ${isActive ? colors.gray : '#c6cbcb'};
    background-color: ${isActive ? colors.gray : colors.white1};
    color: ${colors.black11};
    font-size: 13px;
    line-height: 40px;
    text-decoration: none;
    text-align: center;
    cursor: pointer;

    & + & {
      border-left: none;
    }
  `}
`

function MainTabs({ activeTab, setActiveTab }: Props) {
  return (
    <Wrapper>
      <WrapperItem>
        {['Resume', 'Champions', 'Ligues'].map((label, index) => (
          <Item key={label} isActive={index === activeTab} onClick={() => setActiveTab(index)}>
            {label}
          </Item>
        ))}
      </WrapperItem>
      <Line />
    </Wrapper>
  )
}

export default MainTabs
