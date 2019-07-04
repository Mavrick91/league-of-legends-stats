import React from 'react'
import { shallow } from 'enzyme'
import ProfileIcon from '../index'

describe('ProfileIcon', () => {
  const getInitialProps = overrides => ({
    profileIconId: 123,
    summonerLevel: 34,
    tier: 'silver',
    ...overrides,
  })

  describe('When all props are ok', () => {
    const props = getInitialProps()
    const wrapper = shallow(<ProfileIcon {...props} />)

    it('should have border', () => {
      expect(wrapper.find("[data-test='border']")).toHaveLength(1)
    })

    it('should have icon', () => {
      expect(wrapper.find("[data-test='icon']")).toHaveLength(1)
    })

    it("should display the summoner's level", () => {
      expect(wrapper.text()).toContain(34)
    })
  })

  describe('When tier is missing', () => {
    const props = getInitialProps({ tier: null })
    const wrapper2 = shallow(<ProfileIcon {...props} />)

    it('should not display border', () => {
      expect(wrapper2.find("[data-test='border']")).toHaveLength(0)
    })
  })
})
