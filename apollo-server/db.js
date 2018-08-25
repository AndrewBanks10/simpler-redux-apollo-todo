const fs = require('fs')

const todoFilename = 'todos.txt'
let TODOS = []

function writeFile (path, strFile) {
  fs.writeFileSync(path, strFile)
}

function writeJSON (path, jsonFile) {
  writeFile(path, JSON.stringify(jsonFile, null, 2))
}

function readFile (path) {
  if (!fs.existsSync(path)) {
    return null
  }
  return fs.readFileSync(path, 'utf8')
}

function readJSON (path) {
  return JSON.parse(readFile(path))
}

function loadTodosFile () {
  TODOS = readJSON(todoFilename) || []
}

function saveTodosFile () {
  writeJSON(todoFilename, TODOS)
}

function getTodo (id) {
  let target = null

  TODOS.some((item) => {
    if (item.id === id) {
      target = item
      return true
    }
  })

  return target
}

function getTodos () {
  return TODOS
}

function saveTodos (todos) {
  TODOS = todos.todos
  saveTodosFile()
}

function maxID () {
  let max = 0
  for (let i = 0; i < TODOS.length; ++i) {
    const id = parseInt(TODOS[i].id)
    if (id > max) {
      max = id
    }
  }
  return max
}

function insertTodo ({ text, completed }) {
  const item = {
    id: (maxID() + 1).toString(),
    text,
    completed
  }

  TODOS.push(item)
  saveTodosFile()
  return item
}

function removeTodo ({ id }) {
  let index = null
  TODOS.some((item, i) => {
    if (item.id === id) {
      index = i
      return true
    }
  })

  let target = null
  if (index !== -1) {
    target = TODOS[index]
    TODOS.splice(index, 1)
  }
  saveTodosFile()
  return target
}

function changeTodo ({ todo }) {
  let index = null
  TODOS.some((item, i) => {
    if (item.id === todo.id) {
      index = i
      return true
    }
  })

  let target = null
  if (index !== null) {
    TODOS[index] = todo
    target = todo
  }
  saveTodosFile()
  return target
}

loadTodosFile()

module.exports = {getTodo, getTodos, insertTodo, removeTodo, changeTodo, saveTodos}
