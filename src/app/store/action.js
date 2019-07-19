// @flow

export const fetchSaga = (entityName: string, payload: {}) => ({
  type: `${entityName.toUpperCase()}_REQUEST`,
  entityName,
  payload,
})
