//
// The state and service functions in this model will be shared by all of the todo components.
//

import { buildSelectorsFromUIState } from 'simpler-redux'
import { getTodos, saveTodos, addTodo, updateTodo, deleteTodo } from '../../apollo/apollo-app'
import { externalServiceFunctions as errorExternalServiceFunctions } from '../Error'
import { FILTER_ALL } from './filters.js'

// Used for filtering.
const todoType = {
  id: '',
  text: '',
  completed: false
}

/*
*
* State management
*
*/
export const reducerKey = 'apolloTodo'
export let reducerState
let setState

// This is the reducer state shape.
const initialState = {
  todoEditDisabled: false,
  todos: [],
  text: '',
  editText: '',
  editID: -1,
  filter: FILTER_ALL,
  hasCompleted: false,
  numOutstanding: 0
}

//
// Shared models must implement selectors so that other modules/components can use them.
// Simpler-redux builds a selectors object from the reducerKey and initialState.
//
export const selectors = buildSelectorsFromUIState(reducerKey, initialState)

/*
*
* Service function management
*
*/
const numOutstanding = arr =>
  arr.filter(entry => !entry.completed).length

const hasCompleted = arr =>
  arr.filter(entry => entry.completed).length > 0

// Apollo sends back junk in the todo objects.
// This gets rid of it.
const filterTodo = apolloTodo => {
  let todo = {}
  Object.keys(todoType).forEach(e => {
    todo[e] = apolloTodo[e]
  })
  return todo
}

const updateTodos = arr =>
  setState({
    todos: arr,
    hasCompleted: hasCompleted(arr),
    numOutstanding: numOutstanding(arr),
    text: '',
    editText: '',
    editID: -1,
    todoEditDisabled: false
  })

// Initial load of the todos.
const loadTodos = async () => {
  // Errors are handled in the higher code so we do not have to worry about it here.
  // If an error occurs then the code after the await will not execute.
  const ret = await getTodos()
  const todos = ret.data.todos.map(e =>
    filterTodo(e)
  )
  updateTodos(todos)
}

//
// When the Todos component is constructed this is called. So this is before the normal
// componentDidMount and allows a loadTodos earlier in the component lifecycle.
//
export const storeIsDefinedCallback = (store, stateAccessors) => {
  // Dynamically add the reducer in this module so that it is self contained.
  // We do not want other modules responsible for installing this module's reducer.
  store.addReducer(reducerKey, initialState);
  ({ reducerState, setState } = stateAccessors(store, reducerKey, initialState))
  loadTodos()
}

const findTodo = (todos, id) =>
  todos.findIndex(e => e.id === id)

//
// The next set of functions do not reload the updated todos from the server because of inefficiency.
// So they fix the local todos instead.
//
const saveTodo = async () => {
  const text = reducerState.text
  if (text.trim() === '') {
    return
  }
  if (reducerState.todos.findIndex(e => e.text === text) !== -1) {
    errorExternalServiceFunctions.setError('Todo Error', `The todo ${text} already exists.`)
    return
  }
  // Always disable the control during async operations so that another cannot come in.
  reducerState.todoEditDisabled = true
  try {
    const ret = await addTodo(text, false)
    // If the operation fails above, we do not come here.
    const todo = filterTodo(ret.data.addTodo)
    // Fix the local todos
    const arr = [...reducerState.todos]
    arr.push(todo)
    updateTodos(arr)
  } catch (_ex) {
    reducerState.todoEditDisabled = false
  }
}

const putTodo = async todo => {
  const ret = await updateTodo(todo)
  todo = filterTodo(ret.data.updateTodo)
  // Fix the local todos
  const arr = [...reducerState.todos]
  const index = findTodo(arr, todo.id)
  if (index >= 0) {
    arr[index] = todo
    updateTodos(arr)
  }
}

const removeTodo = async id => {
  await deleteTodo(id)
  // Fix the local todos
  reducerState.todos = reducerState.todos.filter(entry => entry.id !== id)
}

const copyTodo = id => {
  const arr = reducerState.todos
  const index = findTodo(arr, id)
  return { ...arr[index] }
}

const clearCompleted = async () => {
  const todos = reducerState.todos.filter(entry => !entry.completed)
  await saveTodos(todos)
  // Fix the local todos
  reducerState.todos = todos
}

export const serviceFunctions = {
  // Gets rid of all completed todos.
  clearCompleted,
  // Called to update an existing todo text.
  updateText: text =>
    (reducerState.text = text),
  // Called to update a todo text.
  updateEditText: text =>
    (reducerState.editText = text),
  // Save a new todo
  saveTodo,
  // Called to save a changed todo text.
  saveEdit: id => {
    const todo = copyTodo(id)
    todo.text = reducerState.editText
    putTodo(todo)
  },
  // Called to toggle a todo completion.
  onCheck: id => {
    const todo = copyTodo(id)
    todo.completed = !todo.completed
    putTodo(todo)
  },
  // Start editing an existing todo text.
  startEdit: id => {
    setState({ editText: '', editID: -1 })
    const arr = reducerState.todos
    setState({editText: arr[findTodo(arr, id)].text, editID: id})
  },
  // Done editing an existing todo text. Left to text area.
  endEdit: () =>
    setState({ editText: '', editID: -1 }),
  // Delete a todo.
  deleteTodo: id =>
    removeTodo(id),
  // A tab sets the filter for display.
  setFilter: filter =>
    (reducerState.filter = filter)
}
