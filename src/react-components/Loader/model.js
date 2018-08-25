// Global spinner.
export const reducerKey = 'loader'

export const initialState = {
  busyCounter: 0
}

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({reducerState} = stateAccessors(store, reducerKey, initialState))

export const externalServiceFunctions = {
  setBusy: () => reducerState.busyCounter++,
  unsetBusy: () => reducerState.busyCounter--
}
