//
// There is one reducer key state for this project.
// This module actually makes the reducer key state.
//
import { storeIsDefinedCallback, serviceFunctions, selectors, reducerKey } from './sharedmodel'

export const componentName = 'Todo'

// The view only gets access to 'filter'.
const selectorList = [
  {reducerKey, selectors, keylist: ['filter']}
]

// The view only gets access to 'setFilter' in the shared serviceFunctions.
// withStore=true would cause the mapDispatchToProps to have the store as the
// first parameter to all service functions in the group followed by the UI
// supplied parameters.
const serviceFunctionList = [
  {serviceFunctions, keylist: ['setFilter']}
]

export { storeIsDefinedCallback, selectorList, serviceFunctionList }
