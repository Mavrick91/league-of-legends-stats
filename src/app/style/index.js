import { createGlobalStyle } from 'styled-components'
import colors from './colors'

export const theme = {
  colors: { ...colors },
}

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    font-family: Helvetica,serif;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }
`

export default GlobalStyle
