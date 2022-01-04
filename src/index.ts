import 'reflect-metadata'
import dotenv from 'dotenv-safe'
import { ApolloServer } from 'apollo-server'
import { Connection } from 'typeorm'
import { InternalServerError } from './errors/InternalServerError'
import { createSchema } from './createSchema'
import { createTypeormConn } from './utils'

dotenv.config({ allowEmptyValues: true })

// type logLevel =
//   | 'advanced-console'
//   | 'simple-console'
//   | 'file'
//   | 'debug'
//   | Logger

type GraceFulShutdown = {
  app: ApolloServer
  done: Mocha.Done
  repository: Connection
}

let shutdown: (done: Mocha.Done) => Promise<void>

const {
  APP_PORT,
  NODE_ENV,
  // PG_HOST,
  // PG_PORT,
  // PG_USERNAME,
  // PG_PASSWORD,
  // PG_DATABASE,
  // LOG_LEVEL,
} = process.env

const isProduction = NODE_ENV === 'production'
// const isTest = NODE_ENV === 'test'

const apolloServer = async (repository: Connection) =>
  new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => ({
      req,
      res,
      repository: repository,
    }),
    formatError: InternalServerError,
    stopOnTerminationSignals: true,
  })

// const databaseConnection = async () => {
//   if (isTest) {
//     return createConnection()
//   }
//   return createConnection({
//     name: 'default',
//     type: 'postgres',
//     port: Number(PG_PORT),
//     host: PG_HOST,
//     username: PG_USERNAME,
//     password: PG_PASSWORD,
//     database: PG_DATABASE,
//     entities: [Freight],
//     logger: LOG_LEVEL as logLevel,
//     logging: !isProduction ? 'all' : undefined,
//     migrations: !isProduction
//       ? [path.join(__dirname, './datastore/migrations/*')]
//       : undefined,
//   })
// }

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
  const repository = await createTypeormConn()

  if (!isProduction) {
    await repository.runMigrations()
  }
  if (repository.isConnected) {
    console.log('[POSTGRES] Database connected')
  }

  const app = await apolloServer(repository)

  app.listen(parseInt(APP_PORT || '3000')).then(({ url }) => {
    console.log(`🚀 Starting server on port: ${APP_PORT} and url: ${url}`)
  })

  shutdown = (done: Mocha.Done) => appShutdown({ repository, app, done })
}

const sever = main().catch((err) => {
  console.log('Error to init application. Reason: ', err)
})

export { sever, shutdown }
