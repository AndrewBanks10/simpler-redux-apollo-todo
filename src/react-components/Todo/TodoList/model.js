//
// This component does not have a reducer of its own.
// It uses some of the state from the Todo sharedmodel.
// This means this component will only update based on state it needs.
// By delivering all the state down the props all react component will re-render
// when any state changes which is inefficient.
//
import { selectors, serviceFunctions, reducerKey } from '../sharedmodel'

export const componentName = 'TodoList'

// The below keys in keylist will be in the props of this component from the Todo selectors.
export const selectorList = [
  {reducerKey, selectors, keylist: ['filter', 'todos', 'editID']}
]

export const serviceFunctionList = [
  {serviceFunctions, keylist: ['deleteTodo', 'onCheck', 'startEdit']}
]
