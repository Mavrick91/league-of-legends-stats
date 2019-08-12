// @flow

import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    color: ${colors.white5};
    text-align: center;
    margin-top: 100px;
    font-weight: bolder;

    & > :nth-child(1) {
      font-size: 80px;
    }
    & > :nth-child(2) {
      font-size: 35px;
    }
  `}
`

function underMaintenance() {
  return (
    <Wrapper>
      <div>UNDER</div>
      <div>CONSTRUCTION</div>
    </Wrapper>
  )
}

export default underMaintenance
