// @flow

import * as React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.Node,
}

const Wrapper = styled.div`
  border: 1px solid #cdd2d2;
  box-shadow: 0 1px #dcdfdf;
  background: #f2f2f2;
  border-radius: 2px;
  padding: 8px 0;
`

function BasicContainer({ children }: Props) {
  return <Wrapper>{children}</Wrapper>
}

export default BasicContainer
