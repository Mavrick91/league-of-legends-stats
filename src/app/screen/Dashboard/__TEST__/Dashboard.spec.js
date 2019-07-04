import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Home from '../../Home'
import App from '../../../../App'
import InformationSummoner from '../components/InformationSummoner'

describe('Dashboard', () => {
  const getInitialProps = overrides => ({
    fetchSummonerId: jest.fn(),
    match: { params: null },
    summoner: {},
    ...overrides,
  })

  describe('When no summoner name in the url', () => {
    it('should redirect to /', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>,
      )

      expect(wrapper.find(Dashboard)).toHaveLength(0)
      expect(wrapper.find(Home)).toHaveLength(1)
    })
  })

  describe('When url is hardcoded and no summoner was fetched', () => {
    it('should fetch summoner id', () => {
      const props = getInitialProps({
        match: { params: { summonerName: 'papa' } },
        summoner: {},
      })
      shallow(<Dashboard {...props} />)

      expect(props.fetchSummonerId).toHaveBeenCalledTimes(1)
    })

    it('should display loading', () => {
      const props = getInitialProps({
        match: { params: { summonerName: 'papa' } },
      })
      const wrapper = shallow(<Dashboard {...props} />)

      expect(wrapper.text()).toContain('Loading...')
    })
  })

  describe('When everything is ok', () => {
    it('should render component', () => {
      const props = getInitialProps({
        match: { params: { summonerName: 'papa' } },
        summoner: {
          fake: 'data',
        },
      })
      const wrapper = shallow(<Dashboard {...props} />)

      expect(wrapper.find(InformationSummoner)).toHaveLength(1)
    })
  })

  describe('When there is an error while fetching data', () => {
    it('should display error', () => {
      const props = getInitialProps({
        match: { params: { summonerName: 'papa' } },
        summoner: {
          error: 'data',
        },
      })
      const wrapper = shallow(<Dashboard {...props} />)

      expect(wrapper.text()).toContain('Error while fetching')
    })
  })
})
