import React from 'react'
import { shallow } from 'enzyme'
import Home from '../Home'

describe('Home', () => {
  const handleSubmitMock = jest.fn()
  const wrapper = shallow(<Home handleSubmit={handleSubmitMock} />)

  it('should contain a Form', () => {
    expect(wrapper.find('Form')).toHaveLength(1)
  })

  it('should have a TextFieldInput', () => {
    expect(wrapper.find('TextFieldInput')).toHaveLength(1)
  })

  it('TextFieldInput should have the correct prop name', () => {
    expect(wrapper.find('TextFieldInput').prop('name')).toEqual('summonerName')
  })

  it('should call the onSubmit method', () => {
    wrapper.find('Form').simulate('submit')
    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
  })
})
