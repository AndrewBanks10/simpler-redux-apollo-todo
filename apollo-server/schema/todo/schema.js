const TodoType = `
  input TodoInput {
    id: String!
    text: String!
    completed: Boolean
  }
  type Todo {
    id: String!
    text: String!
    completed: Boolean
  }
`

module.exports.default = TodoType
