
export const isLoaded = (state, requestName) => state.loaderState[requestName] === 0

export const isLoading = (state, requestName) => state.loaderState[requestName] === 1

export const isErrorLoading = (state, requestName) =>
  state.loaderState[requestName] === -1
