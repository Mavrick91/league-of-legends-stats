// @flow

import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from 'app/style'
import Routes from 'app/routes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Routes />
      </>
    </ThemeProvider>
  )
}

export default App
