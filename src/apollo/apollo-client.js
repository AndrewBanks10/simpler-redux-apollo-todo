import ApolloClient from 'apollo-boost'

export async function apolloClientQuery (client, query, variables) {
  try {
    const queryObj = {query, variables}
    const ret = await client.query(queryObj)
    return Promise.resolve(ret)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function apolloClientMutation (client, mutation, variables) {
  try {
    const mutationObj = {mutation, variables}
    const ret = await client.mutate(mutationObj)
    return Promise.resolve(ret)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const hostClient = new ApolloClient({
})
