//
// This component does not have a reducer of its own.
// It uses some of the state from the Todo sharedmodel and some of its service functions.
// This means this component will only update based on state it needs.
// By delivering all the state down the props all react component will re-render
// when any state changes which is inefficient.
//
import { reducerKey, selectors, serviceFunctions } from '../sharedmodel'

export const componentName = 'OutstandingItems'

export const selectorList = [
  {reducerKey, selectors, keylist: ['hasCompleted', 'numOutstanding']}
]

export const serviceFunctionList = [
  {serviceFunctions, keylist: ['clearCompleted']}
]
