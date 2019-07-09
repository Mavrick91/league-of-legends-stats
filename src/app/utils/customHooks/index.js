import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'ramda'
import { fetchInfo } from 'app/store/action'

export function useSaga(entityName, apiEndpoint, urlParams) {
  const entity = useSelector(state => state.entities[entityName])
  const dispatch = useDispatch()

  if (urlParams.some(param => param === null || param === undefined)) return

  if (!entity || isEmpty(entity))
    dispatch(
      fetchInfo({
        entityName,
        apiEndpoint,
        urlParams,
      }),
    )
}
