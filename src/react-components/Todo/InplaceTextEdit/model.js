//
// This component does not have a reducer of its own.
// It uses some of the state from the Todo sharedmodel and some of its service functions.
// This means this component will only update based on state it needs.
// By delivering all the state down the props all react component will re-render
// when any state changes which is inefficient. So, this method is not used.
//
import { reducerKey, selectors, serviceFunctions } from '../sharedmodel'

export const componentName = 'InplaceTextEdit'

export const selectorList = [
  {reducerKey, selectors, keylist: ['editText', 'editID']}
]

export const serviceFunctionList = [
  {serviceFunctions, keylist: ['endEdit', 'updateEditText', 'saveEdit']}
]
