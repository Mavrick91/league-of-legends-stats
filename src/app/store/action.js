// @flow

type TypeParams = {
  entityName: string,
  apiEndpoint: () => void,
  args: Array<String>,
}

export const fetchInfo = ({
  entityName,
  apiEndpoint,
  args,
}: TypeParams) => {
  return ({
    type: 'ENTITY_REQUEST',
    entityName,
    apiEndpoint,
    payload: args,
  })
}
