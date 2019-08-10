// @flow

export const fetchSaga = (entityName: string, payload: {}) => ({
  type: `${entityName.toUpperCase()}_REQUEST`,
  entityName,
  payload,
})

export const resetEntity = (entityName: string) => ({
  type: 'ENTITY_RESET',
  entityName,
})
