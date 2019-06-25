// @flow

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ConnectedRouter } from 'connected-react-router'
import GlobalStyle, { theme } from 'app/style'
import Routes from 'app/routes'
import { Provider } from 'react-redux'
import store, { history } from 'app/store'

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Routes />
          </>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
