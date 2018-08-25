const TodoType = require('./todo/schema').default
const QueryTodos = require('./query/schema').default
const MutateTodos = require('./mutation/schema').default
const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const SchemaDefinition = `
  schema {
    query: QueryTodos,
    mutation: MutateTodos
  }
`

const schema = makeExecutableSchema({
  // Add the type definitions to the schema
  typeDefs: [
    SchemaDefinition,
    QueryTodos,
    MutateTodos,
    TodoType
  ],
  resolvers
})

module.exports.default = schema
