// @flow

type TypeParams = {
  entityName: string,
  apiEndpoint: () => void,
  urlParams: Array<String>,
}

export const fetchInfo = ({
  entityName,
  apiEndpoint,
  urlParams,
}: TypeParams) => ({
  type: 'ENTITY_REQUEST',
  entityName,
  apiEndpoint,
  urlParams,
})
