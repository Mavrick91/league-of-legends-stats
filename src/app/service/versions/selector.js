import { createSelector } from 'reselect'

const getVersions = state => state.entities.versions

export const getVersionsSelector = createSelector(
  getVersions,
  versions => versions,
)
