const mockAxios = jest.genMockFromModule('axios')

mockAxios.create = jest.fn(() => mockAxios)
mockAxios.get = jest.fn()

export default mockAxios
