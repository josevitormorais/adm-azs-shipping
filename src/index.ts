import 'reflect-metadata'
import dotenv from 'dotenv-safe'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { Connection, createConnection } from 'typeorm'
import { Freight } from './datastore/entities/Freight'
import { FreightResolver } from './resolvers/FreightResolver'
import { InternalServerError } from './errors/InternalServerError'
import path from 'path'

dotenv.config({ allowEmptyValues: true })

const {
  APP_PORT,
  PG_HOST,
  PG_PORT,
  PG_USERNAME,
  PG_PASSWORD,
  PG_DATABASE,
  NODE_ENV,
} = process.env

const isProduction = NODE_ENV === 'production'

const emitSchemaFileOptions = {
  path: path.join(__dirname, '/schema.gql'),
  commentDescriptions: true,
}

const apolloServer = async (repository: Connection) =>
  new ApolloServer({
    schema: await buildSchema({
      resolvers: [FreightResolver],
      emitSchemaFile: emitSchemaFileOptions,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      repository: repository,
    }),
    formatError: InternalServerError,
  })

const databseConnection = async () =>
  createConnection({
    type: 'postgres',
    port: Number(PG_PORT),
    host: PG_HOST,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    entities: [Freight],
    logger: 'advanced-console',
    logging: !isProduction ? 'all' : undefined,
    cache: true,
  })

const runningMigrations = async (isRun = false, repository: Connection) => {
  if (!isRun) {
    return Promise.resolve()
  }
  return repository
    .runMigrations()
    .then(() => {
      console.log('[MIGRATION] successfully executed')
    })
    .catch((err) => {
      console.log('[MIGRATION] error to run. Reason: ', err)
      throw err
    })
}

async function main() {
  const repository = await databseConnection()

  runningMigrations(isProduction, repository)

  const server = await apolloServer(repository)

  server.listen(parseInt(APP_PORT || '3000')).then(({ url }) => {
    if (repository.isConnected) {
      console.log('[POSTGRES] Database connected')
    }
    console.log(`🚀 Starting server on port: ${APP_PORT} and url: ${url}`)
  })
}

main().catch((err) => {
  console.log('Error to init application. Reason: ', err)
})
