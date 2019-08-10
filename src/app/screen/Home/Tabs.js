// @flow

import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  activeTab: number,
  setActiveTab: number => void,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    height: 40px;
    background-color: ${colors.white};
    position: relative;
    z-index: 10;
    display: flex;
    font-size: 14px;
    cursor: pointer;
  `}
`

const Tab = styled.div`
  ${({ theme: { colors }, isActive }) => css`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${isActive ? colors.white : colors.gray1};
    color: ${isActive ? colors.black18 : colors.black17};
  `}
`

function Tabs({ activeTab, setActiveTab }: Props) {
  const tabs = ['Recent Search', 'Favoris']

  return (
    <Wrapper>
      {tabs.map((tab, index) => (
        <Tab key={tab} isActive={activeTab === index} onClick={() => setActiveTab(index)}>
          {tab}
        </Tab>
      ))}
    </Wrapper>
  )
}

export default Tabs
