import { capitalize } from '../string'

describe('capitalize', () => {
  it('hello', () => {
    const result = capitalize('hello')
    expect(result).toEqual('Hello')
  })
  it('hellO', () => {
    const result = capitalize('hellO')
    expect(result).toEqual('HellO')
  })
  it('hellOo', () => {
    const result = capitalize('hellOo', true)
    expect(result).toEqual('Helloo')
  })
  it('PAPA', () => {
    const result = capitalize('PAPA')
    expect(result).toEqual('PAPA')
  })
  it('MAMA', () => {
    const result = capitalize('MAMA', true)
    expect(result).toEqual('Mama')
  })
})
