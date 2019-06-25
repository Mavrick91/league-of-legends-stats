import { updateLoader } from '../action'
import { UPDATE_LOADER } from '../reducer'

describe('Loader action', () => {
  it('should create action to fetch summoner info', () => {
    expect(updateLoader('mavrick', 0)).toEqual({
      type: UPDATE_LOADER,
      requestName: 'mavrick',
      statusResponseRequest: 0,
    })
  })
})
