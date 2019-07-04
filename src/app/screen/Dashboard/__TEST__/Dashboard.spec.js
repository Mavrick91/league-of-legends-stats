import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import ProfileIcon from 'app/components/ProfileIcon'
import Dashboard from '../Dashboard'
import Home from '../../Home'
import App from '../../../../App'

describe('Dashboard', () => {
  const getInitialProps = overrides => ({
    fetchSummonerId: jest.fn(),
    match: { params: null },
    isSummonerLoaded: false,
    summoner: {
      profileIconId: 123,
    },
    ...overrides,
  })

  it('should redirect to /', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>,
    )

    expect(wrapper.find(Dashboard)).toHaveLength(0)
    expect(wrapper.find(Home)).toHaveLength(1)
  })

  it('should fetch summoner id', () => {
    const props = getInitialProps({
      match: { params: { summonerName: 'papa' } },
    })
    shallow(
      <Dashboard {...props}>
        <div>test</div>
      </Dashboard>,
    )

    expect(props.fetchSummonerId).toHaveBeenCalledTimes(1)
  })

  it('should not render children', () => {
    const props = getInitialProps({
      match: { params: { summonerName: 'papa' } },
    })
    const wrapper = shallow(
      <Dashboard {...props}>
        <div>test</div>
      </Dashboard>,
    )

    expect(wrapper.text()).toContain('Loading...')
  })

  it('should render children', () => {
    const props = getInitialProps({
      match: { params: { summonerName: 'papa' } },
      isSummonerLoaded: true,
    })
    const wrapper = shallow(<Dashboard {...props} />)

    expect(wrapper.find(ProfileIcon)).toHaveLength(1)
  })
})
