import { UPDATE_LOADER } from './reducer'

export const updateLoader = (requestName, status = 0) => ({
  type: UPDATE_LOADER,
  requestName,
  statusResponseRequest: status,
})
