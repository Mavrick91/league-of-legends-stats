// @flow

import Routes from 'app/routes'
import store, { history } from 'app/store'
import GlobalStyle, { theme } from 'app/style'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { fetchSaga } from './app/store/action'

store.dispatch(fetchSaga('static_data'))

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <Routes />
            </>
          </ThemeProvider>
        </CookiesProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
