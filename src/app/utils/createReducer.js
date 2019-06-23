import { isNil, is, has, any, equals, keys } from 'ramda'

const createReducer = (initialState, handlers) => {
  // https://github.com/infinitered/reduxsauce/blob/master/lib/createReducer.js
  // initial state is required
  if (isNil(initialState)) {
    throw new Error('initial state is required')
  }

  // handlers must be an object
  if (isNil(handlers) || !is(Object, handlers)) {
    throw new Error('handlers must be an object')
  }

  // handlers cannot have an undefined key
  if (any(equals('undefined'))(keys(handlers))) {
    throw new Error('handlers cannot have an undefined key')
  }

  // create the reducer function
  return (state = initialState, action) => {
    // wrong actions, just return state
    if (isNil(action)) return state
    if (!has('type', action)) return state

    // look for the handler
    const handler = handlers[action.type] || null

    // no handler no cry
    if (isNil(handler)) return state

    // execute the handler
    return handler(state, action)
  }
}

export default createReducer
