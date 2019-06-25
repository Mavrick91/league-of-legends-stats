import { isErrorLoading, isLoaded, isLoading } from '../selector'

describe('Loader selector', () => {
  it("should return true if it's loading", () => {
    const mockState = {
      loaderState: {
        baba: 1,
      },
    }
    expect(isLoading(mockState, 'baba')).toEqual(true)
  })

  it("should return true if it's loaded", () => {
    const mockState = {
      loaderState: {
        baba: 0,
      },
    }
    expect(isLoaded(mockState, 'baba')).toEqual(true)
  })

  it('should return true if there is an error', () => {
    const mockState = {
      loaderState: {
        baba: -1,
      },
    }
    expect(isErrorLoading(mockState, 'baba')).toEqual(true)
  })
})
