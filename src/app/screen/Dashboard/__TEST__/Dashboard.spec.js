import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from '../index'
import Home from '../../Home'
import App from '../../../../App'

jest.mock('../../../service/summoner/selector')

describe('Dashboard', () => {
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
})
