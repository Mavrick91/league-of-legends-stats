import React from 'react'
import { render } from '@testing-library/react'
import { getByText } from '@testing-library/dom'
import { theme } from 'app/style'
import 'jest-dom/extend-expect'
import SimpleCard from '..'
import { ThemeProvider } from 'styled-components'

describe('SimpleCard', () => {
  const defaultProps = overrides => ({
    tier: 'SILVER',
    rank: 'III',
    leaguePoints: 123,
    wins: 10,
    losses: 10,
    leagueName: 'fake league name',
    title: 'newTitle',
    ...overrides,
  })

  const getContainer = props =>
    render(
      <ThemeProvider theme={theme}>
        <SimpleCard {...defaultProps(props)} />
      </ThemeProvider>,
    )

  describe('When all props are given', () => {
    it('should display the title', () => {
      const { container } = getContainer()
      expect(getByText(container, 'newTitle')).toBeInTheDocument()
    })

    it('should display the emblem', () => {
      const { container } = getContainer()
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        'silver.png',
      )
    })

    it('should display the rank', () => {
      const { container } = getContainer()
      expect(getByText(container, 'Silver 3')).toBeInTheDocument()
    })

    it('should display the league points', () => {
      const { container } = getContainer()
      expect(getByText(container, '123 LP')).toBeInTheDocument()
    })

    it('should display the league wins / losses', () => {
      const { container } = getContainer()
      expect(getByText(container, /10V 10D/)).toBeInTheDocument()
    })

    it('should display the win rate', () => {
      const { container } = getContainer()
      expect(getByText(container, 'Win Rate 50%')).toBeInTheDocument()
    })

    it('should display the league name', () => {
      const { container } = getContainer()
      expect(getByText(container, 'fake league name')).toBeInTheDocument()
    })
  })

  describe('When showLeague is false', () => {
    it('should not display league name', () => {
      const { container } = getContainer({ showLeague: false })
      expect(
        container.querySelector('fake league name'),
      ).not.toBeInTheDocument()
    })
  })
})
