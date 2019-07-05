import React from 'react'
import { render } from '@testing-library/react'
import { getByText } from '@testing-library/dom'
import { SummonerContext } from 'app/screen/Dashboard/Dashboard'
import 'jest-dom/extend-expect'
import SoloRanked from '../index'

describe('SoloRanked', () => {
  const summoner = overrides => ({
    tier: 'SILVER',
    rank: 'III',
    leaguePoints: 123,
    wins: 10,
    losses: 10,
    leagueName: 'fake league name',
    ...overrides,
  })

  const Component = props => (
    <SummonerContext.Provider value={summoner(props)}>
      <SoloRanked />
    </SummonerContext.Provider>
  )

  describe('When all props are given', () => {
    const getContainer = props => render(<Component {...props} />)

    it.skip('should display the emblem', () => {
      const { container, debug } = getContainer()

      debug()
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        `${summoner.tier.toLowerCase()}.png`,
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

    it('should display the win ratio', () => {
      const { container } = getContainer()
      expect(getByText(container, 'Win Ratio 50%')).toBeInTheDocument()
    })

    it('should display the league name', () => {
      const { container } = getContainer()
      expect(getByText(container, 'fake league name')).toBeInTheDocument()
    })
  })
})
