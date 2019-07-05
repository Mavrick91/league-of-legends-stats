// @flow

import * as React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  children: React.Node,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.white3};
    box-shadow: 0 1px ${colors.white2};
    background: ${colors.white1};
    border-radius: 2px;
    width: 100%;
  `}
`

function BasicContainer({ children }: Props) {
  return <Wrapper>{children}</Wrapper>
}

export default BasicContainer
