// Global error handler.
export const reducerKey = 'error'

export const initialState = {
  error: '',
  title: ''
}

let reducerState
let setState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({reducerState, setState} = stateAccessors(store, reducerKey, initialState))

export const serviceFunctions = {
  clearError: () =>
    (reducerState.error = '')
}

export const externalServiceFunctions = {
  setError: (title, error) =>
    setState({ title, error })
}
