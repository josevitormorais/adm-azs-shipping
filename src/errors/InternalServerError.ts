import { ApolloError } from 'apollo-server-express'
import { GraphQLError } from 'graphql'

export const InternalServerError = (err: Error): Error => {
  if (err instanceof ApolloError || err instanceof GraphQLError) {
    return err
  }
  if (process.env.NODE_ENV === 'development') {
    return err
  }
  return new Error('Internal server error.')
}
