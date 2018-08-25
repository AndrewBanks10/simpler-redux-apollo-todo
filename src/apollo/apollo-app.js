import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { apolloClientQuery, apolloClientMutation } from './apollo-client'
import { externalServiceFunctions as loaderExternalServiceFunctions } from '../react-components/Loader'
import { externalServiceFunctions as errorExternalServiceFunctions } from '../react-components/Error'

const todosClient = new ApolloClient({
  uri: 'http://localhost:3020/graphql'
})

const errorTitle = 'Network Error'

//
// This apollo query handles errors and busy so that the calling code never needs to worry about it.
//
export async function runApolloClientQuery (client, query, variables) {
  loaderExternalServiceFunctions.setBusy()
  try {
    const ret = await apolloClientQuery(client, query, variables)
    loaderExternalServiceFunctions.unsetBusy()
    return Promise.resolve(ret)
  } catch (err) {
    loaderExternalServiceFunctions.unsetBusy()
    errorExternalServiceFunctions.setError(errorTitle, `${err}`)
    return Promise.reject(err)
  }
}

//
// This apollo query mutation code handles errors and busy so that the calling code never needs to worry about it.
//
export async function runApolloClientMutation (client, mutation, variables) {
  loaderExternalServiceFunctions.setBusy()
  try {
    const ret = await apolloClientMutation(client, mutation, variables)
    loaderExternalServiceFunctions.unsetBusy()
    return Promise.resolve(ret)
  } catch (err) {
    loaderExternalServiceFunctions.unsetBusy()
    errorExternalServiceFunctions.setError(errorTitle, `${err}`)
    return Promise.reject(err)
  }
}

const GET_TODOS = gql`
query QueryTodos {
  todos {
    text
    completed
    id
  }
}
`

const POST_TODO = gql`
mutation addTodo($text: String!, $completed: Boolean) {
  addTodo(text: $text, completed: $completed) {
    id
    text
    completed
  }
}
`

const PUT_TODO = gql`
mutation updateTodo($todo: TodoInput!) {
  updateTodo(todo: $todo) {
    id
    text
    completed
  }
}
`

const DELETE_TODO = gql`
mutation deleteTodo($id: String!) {
  deleteTodo(id: $id) {
    id
    text
    completed
  }
}
`
const SAVE_TODOS = gql`
mutation saveTodos($todos: [TodoInput]!) {
  saveTodos(todos: $todos)
}
`

export const getTodos = () =>
  runApolloClientQuery(todosClient, GET_TODOS)

export const saveTodos = todos =>
  runApolloClientMutation(todosClient, SAVE_TODOS, {todos})

export const addTodo = (text, completed) =>
  runApolloClientMutation(todosClient, POST_TODO, {text, completed})

export const updateTodo = todo =>
  runApolloClientMutation(todosClient, PUT_TODO, {todo})

export const deleteTodo = id =>
  runApolloClientMutation(todosClient, DELETE_TODO, {id})
