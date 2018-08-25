module.exports.default = `
  type QueryTodos {
    # Returns an individual todo given the id.
    todo(id: String!): Todo,
    # Returns an array of todos.
    todos: [Todo]
  }
`
