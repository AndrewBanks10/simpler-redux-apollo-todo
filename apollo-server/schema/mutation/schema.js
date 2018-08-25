module.exports.default = `
  type MutateTodos {
    # Save all todos and overwrite server source.
    saveTodos (
      todos: [TodoInput]!
    ): Boolean
    # Add a todo.
    addTodo (
      text: String!
      completed: Boolean
    ): Todo
    # Deletes a todo given an id.
    deleteTodo (
      id: String!
    ): Todo
    # Updates a todo.
    updateTodo (
      todo: TodoInput!
    ): Todo
  }
`
