const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema/schema').default
const cors = require('cors')

const port = 3020
const host = 'localhost'

// Initialize the app
const app = express()

// Enable cors support so when the client on a different host tries to query the server
// the client will not be blocked.
app.use('*', cors({
  origin: '*'
}))

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start the server
app.listen(port, () => {
  console.log(`Apollo server listening on http://${host}:${port}/graphql.`)
  console.log(`Go to http://${host}:${port}/graphiql to run sample queries.`)
})

process.on('uncaughtException', function (err) {
  if (err.code.indexOf('EADDRINUSE') !== -1) {
    console.log(`Warning: This program is already running at http://${host}:${port}. Either exit the vscode that may be causing it or kill the node process associated with it.`)
    console.log('Server exiting.')
    process.exit(-1)
  } else {
    console.log(`Server Error: ${err}.`)
  }
})
