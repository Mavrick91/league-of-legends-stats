import reducer, { UPDATE_LOADER } from '../reducer'

describe('Loader reducer', () => {
  it('should return the default state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle UPDATE_LOADER', () => {
    const action = status => ({
      type: UPDATE_LOADER,
      requestName: 'baba',
      statusResponseRequest: status,
    })
    expect(reducer({}, action(0))).toEqual({ baba: 0 })
    expect(reducer({}, action(1))).toEqual({ baba: 1 })
    expect(reducer({}, action(-1))).toEqual({ baba: -1 })
  })
})
