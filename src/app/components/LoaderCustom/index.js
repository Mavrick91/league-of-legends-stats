// @flow

import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

const WrapperLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function LoaderCustom() {
  return (
    <WrapperLoader>
      <Loader type="Rings" color="#333" height={80} width={80} />
    </WrapperLoader>
  )
}

export default LoaderCustom
