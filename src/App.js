// @flow

import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { theme } from 'app/style'
import Routes from 'app/routes'
import { Provider } from 'react-redux'
import store from 'app/store'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Routes />
        </>
      </ThemeProvider>
    </Provider>
  )
}

export default App
