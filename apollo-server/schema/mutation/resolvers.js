const { insertTodo, removeTodo, changeTodo, saveTodos } = require('../../db')

module.exports.default = {
  async saveTodos (_rootObj, { todos }) {
    const ret = await saveTodos({ todos })
    return ret
  },
  async addTodo (_rootObj, { text, completed }) {
    const ret = await insertTodo({ text, completed })
    return ret
  },
  async deleteTodo (_rootObj, { id }) {
    const ret = await removeTodo({ id })
    return ret
  },
  async updateTodo (_rootObj, todo) {
    const ret = await changeTodo(todo)
    return ret
  }
}
