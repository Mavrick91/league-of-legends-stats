import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'ramda'
import { fetchInfo } from 'app/store/action'

export function useSaga(entityName, apiEndpoint, ...args) {
  const entity = useSelector(state => state.entities[entityName])
  const dispatch = useDispatch()

  if (args.some(param => param === null || param === undefined)) return

  if (!entity || isEmpty(entity))
    dispatch(
      fetchInfo({
        entityName,
        apiEndpoint,
        args,
      }),
    )
}
