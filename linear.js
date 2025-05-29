import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://api.linear.app/graphql', {
  headers: {
    Authorization: process.env.LINEAR_API_KEY,
  },
})
export async function getLinearUsers() {
  const query = `
    query {
      users {
        nodes {
          id
          name
          email
        }
      }
    }
  `

  const data = await client.request(query)
  return data.users.nodes // List of all users
}

export default client
