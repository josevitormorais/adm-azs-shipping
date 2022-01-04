import 'reflect-metadata'
import dotenv from 'dotenv-safe'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { Connection, createConnection, Logger } from 'typeorm'
import { Freight } from './datastore/entities/Freight'
import { FreightResolver } from './resolvers/FreightResolver'
import { InternalServerError } from './errors/InternalServerError'
import path from 'path'

dotenv.config({ allowEmptyValues: true })

type logLevel =
  | 'advanced-console'
  | 'simple-console'
  | 'file'
  | 'debug'
  | Logger

type GraceFulShutdown = {
  app: ApolloServer
  done: Mocha.Done
  repository: Connection
}

let shutdown: (done: Mocha.Done) => Promise<void>

const {
  APP_PORT,
  PG_HOST,
  PG_PORT,
  PG_USERNAME,
  PG_PASSWORD,
  PG_DATABASE,
  NODE_ENV,
  LOG_LEVEL,
} = process.env

const isProduction = NODE_ENV === 'production'
const isTest = NODE_ENV === 'test'

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
    stopOnTerminationSignals: true,
  })

const databseConnection = async () => {
  if (isTest) {
    return createConnection()
  }
  return createConnection({
    type: 'postgres',
    port: Number(PG_PORT),
    host: PG_HOST,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    entities: [Freight],
    logger: LOG_LEVEL as logLevel,
    logging: !isProduction ? 'all' : undefined,
    cache: true,
  })
}

const runMigrations = async (isRun = false, repository: Connection) => {
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

async function appShutdown({ app, done }: GraceFulShutdown): Promise<void> {
  return app
    .stop()
    .catch((err) => console.log('Error to shutdown sever. Reason: ', err))
    .finally(() => {
      console.log('Sucessfully shutdown sever.')
      done()
    })
}

async function main() {
  const repository = await databseConnection()

  if (repository.isConnected) {
    console.log('[POSTGRES] Database connected')
  }

  await runMigrations(isProduction, repository)

  const app = await apolloServer(repository)

  app.listen(parseInt(APP_PORT || '3000')).then(({ url }) => {
    console.log(`🚀 Starting server on port: ${APP_PORT} and url: ${url}`)
  })

  shutdown = (done: Mocha.Done) => appShutdown({ repository, app, done })
}

main().catch((err) => {
  console.log('Error to init application. Reason: ', err)
})

export { main, shutdown }
