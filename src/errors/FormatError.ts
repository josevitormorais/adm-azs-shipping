import { ApolloError } from 'apollo-server-express'

export const InternalServerError = (err: Error): Error => {
  if (err instanceof ApolloError) {
    return err
  }
  return new Error('Internal server error.')
}
