import { GraphQLSchema } from 'graphql'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { FreightResolver } from './resolvers/FreightResolver'

const emitSchemaFileOptions = {
  path: path.join(__dirname, '/schema.gql'),
  commentDescriptions: true,
}

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [FreightResolver],
    emitSchemaFile: emitSchemaFileOptions,
  })
