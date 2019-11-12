// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import Overview from './Overview'

type Props = {
  matchDetail: MatchDetailType,
  isWin: boolean,
}

const Wrapper = styled.div`
  ${({ theme: { colors }, isWin }) => css`
    && {
      margin-top: 0;
      background: ${isWin ? colors.blue5 : colors.red4};
      display: flex;
      align-items: center;
      padding-top: 5px;
      justify-content: center;
      flex-direction: column;
    }
  `}
`

const WrapperSection = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  height: 29px;
`
const Section = styled.div`
  ${({ isActive, theme: { colors }, isWin }) => {
    let background = colors.white
    let borderColor = colors.white3
    let hoverColor = null

    if (isWin && !isActive) {
      background = colors.blue7
      borderColor = colors.blue6
      hoverColor = colors.blue8
    }
    if (!isWin && !isActive) {
      borderColor = colors.red3
      background = colors.red6
      hoverColor = colors.red5
    }

    return css`
      height: 29px;
      display: flex;
      width: 156px;
      align-items: center;
      justify-content: center;
      background: ${background};
      border: 1px solid ${borderColor};
      border-bottom: none;
      font-size: 13px;
      font-weight: ${isActive ? 'bold' : null};
      position: relative;
      top: ${isActive && '1px'};

      &:hover {
        background: ${hoverColor};
        cursor: pointer;
      }

      & + & {
        margin-left: 9px;
      }
    `
  }}
`

// const sections = ['Overview', 'Team Analysis', 'Builds', 'etc']
const sections = ['Overview']

const Index = ({ matchDetail, isWin }: Props) => {
  const [activeSection, setActiveSection] = React.useState(sections[0])

  return (
    <Wrapper isWin={isWin}>
      <WrapperSection>
        {sections.map(section => (
          <Section
            key={section}
            isWin={isWin}
            isActive={activeSection === section}
            onClick={() => {
              setActiveSection(section)
            }}
          >
            {section}
          </Section>
        ))}
      </WrapperSection>

      {activeSection === 'Overview' && <Overview matchDetail={matchDetail} isWin={isWin} />}
    </Wrapper>
  )
}

export default Index
