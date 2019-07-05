// @flow

import React from 'react'
import styled from 'styled-components'
import SoloRanked from './components/SoloRanked'

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`

const LeftSide = styled.div`
  margin-right: 25px;
`

function Resume() {
  return (
    <Wrapper>
      <LeftSide>
        <SoloRanked />
      </LeftSide>
      <div>seconde partie</div>
    </Wrapper>
  )
}

export default Resume
