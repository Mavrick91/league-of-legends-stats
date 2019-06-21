import { createGlobalStyle } from 'styled-components'
import colors from './colors'

export const theme = {
  ...colors,
}

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }
`

export default GlobalStyle
