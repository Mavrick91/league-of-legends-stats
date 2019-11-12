import styled, { css } from 'styled-components'

export const Wrapper = styled.tr`
  ${({ theme: { colors }, isMe, isWin }) => {
    let backgroundColor = null

    if (isMe && isWin) backgroundColor = colors.blue11
    if (isMe && !isWin) backgroundColor = colors.red7

    return css`
      background-color: ${backgroundColor};
      & > td {
        padding: 3px 0;
        vertical-align: middle;
      }
    `
  }}
`

export const TdAvatar = styled.td`
  && {
    padding-left: 10px;
    padding-right: 4px;

    & > div {
      width: auto;
      div:first-child {
        height: 32px;
      }
    }
  }
`
export const TdName = styled.td`
  ${({ theme: { colors } }) => css`
    && {
      padding-left: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      a {
        color: ${colors.black11};
        font-size: 11px;
        text-decoration: none;
      }
    }
  `}
`

export const TdRank = styled.td`
  ${({ theme: { colors } }) => css`
    color: ${colors.black11};
    font-size: 11px;
    text-align: center;
    text-transform: capitalize;
  `}
`

export const TdKda = styled.td`
  ${({ theme: { colors }, textColor }) => css`
    font-size: 11px;
    text-align: center;
    white-space: nowrap;
    & > div {
      font-weight: bold;
      color: ${colors[textColor]};
    }
    & > span {
      color: ${colors.black11};
    }
  `}
`

export const TdDamage = styled.td`
  ${({ theme: { colors } }) => css`
    color: ${colors.black11};
    font-size: 11px;
    text-align: center;
  `}
`

export const BarDamage = styled.div`
  ${({ theme: { colors } }) => css`
    width: 50px;
    height: 9px;
    margin: 0 auto;
    border: 1px solid ${colors.white3};
    background-color: ${colors.white1};
  `}
`
export const Fill = styled.div`
  ${({ width, theme: { colors } }) => css`
    width: ${width}%;
    height: 100%;
    border: 1px solid ${colors.red};
    background-color: ${colors.red11};
  `}
`

export const TdWards = styled.td`
  ${({ theme: { colors } }) => css`
    text-align: center;
    color: ${colors.black11};
    font-size: 11px;
  `}
`

export const TdMinion = styled.td`
  ${({ theme: { colors } }) => css`
    font-size: 11px;
    text-align: center;
    color: ${colors.black19};
    & > div:first-child {
      color: ${colors.black11};
    }
  `}
`

export const TdItems = styled.td`
  white-space: nowrap;

  & > div {
    display: inline-block;
    width: 22px;
    height: 22px;
    margin-left: 1px;
    vertical-align: middle;

    & > img {
      width: 100%;
      border-radius: 3px;
    }
  }
`

export const EmptyItem = styled.div`
  ${({ theme: { colors } }) => css`
    display: inline-block;
    height: 22px;
    width: 22px;
    background: ${colors.black};
    opacity: 0.2;
    border-radius: 3px;
  `}
`
