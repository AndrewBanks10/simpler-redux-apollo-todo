import assert from 'assert'
/*
import { createStore, combineReducers } from 'redux'
import { registerSimplerRedux, stateAccessors, generalReducer } from 'simpler-redux'
import * as modelDefinition from '../model'

// Create a store so that the model code can be tested in isolation.
const reducer = generalReducer(modelDefinition.reducerKey, modelDefinition.initialState)
const store = registerSimplerRedux(createStore(combineReducers({ [modelDefinition.reducerKey]: reducer })))

let reducerState
if (modelDefinition.storeIsDefinedCallback) {
  modelDefinition.storeIsDefinedCallback(store, stateAccessors)
  reducerState = modelDefinition.reducerState
}
*/

// The serviceFunctions are in modelDefinition.serviceFunctions
describe('Model Counter', function () {
  // TODO: Add model test code.
  it('Test the serviceFunctions.', function () {
    // assert(reducerState !== undefined)
    assert(true)
  })
})
