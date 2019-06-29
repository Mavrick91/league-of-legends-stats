import { createSelector } from 'reselect'

const getPathname = state => state.router.location.pathname

export const getPathnameSelector = createSelector(
  getPathname,
  pathname => pathname,
)
