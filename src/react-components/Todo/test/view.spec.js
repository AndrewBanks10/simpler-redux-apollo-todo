import assert from 'assert'
import { reducerState } from '../sharedmodel'
import { FILTER_COMPLETE, FILTER_ACTIVE, FILTER_ALL } from '../filters.js'
// Use what you need below. There are others also.
import {
  clickMaterialUITab,
  changeMaterialUITextEdit
  // simulateEnterMaterialUITextEdit
} from '../../../../test/projectsetup'

describe('View TestMaterialUI', function () {
  it('Test Tab Click.', function () {
    assert(reducerState.filter === FILTER_ALL)
    clickMaterialUITab(FILTER_ACTIVE)
    assert(reducerState.filter === FILTER_ACTIVE)
    clickMaterialUITab(FILTER_COMPLETE)
    assert(reducerState.filter === FILTER_COMPLETE)
    clickMaterialUITab(FILTER_ALL)
    assert(reducerState.filter === FILTER_ALL)
  })
  it('Test TodoEdit', function () {
    const todoEditID = 'TodoEdit'
    changeMaterialUITextEdit(todoEditID, '')
    assert(reducerState.text === '')
    const editValue = 'TodoEdit'
    changeMaterialUITextEdit(todoEditID, editValue)
    assert(reducerState.text === editValue)
  })
})
