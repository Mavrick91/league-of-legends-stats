import React from 'react'
import { shallow } from 'enzyme'
import ProfileIcon from 'app/components/ProfileIcon'
import InformationSummoner from '../index'

describe('InformationSummoner', () => {
  const getInitialProps = overrides => ({
    name: 'fake name',
    ...overrides,
  })

  const props = getInitialProps()
  const wrapper = shallow(<InformationSummoner {...props} />)

  it('should contain ProfileIcon', () => {
    expect(wrapper.find(ProfileIcon)).toHaveLength(1)
  })

  it("should display the summoner's name", () => {
    expect(wrapper.text()).toContain('fake name')
  })
})
