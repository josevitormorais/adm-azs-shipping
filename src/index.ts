import 'reflect-metadata'
import dotenv from 'dotenv-safe'
import { ApolloServer } from 'apollo-server'
import { Connection } from 'typeorm'
import { InternalServerError } from './errors/InternalServerError'
import { createSchema } from './createSchema'
import { createTypeormConn } from './utils'

dotenv.config({ allowEmptyValues: true })

type GraceFulShutdown = {
  app: ApolloServer
  done: Mocha.Done
  repository: Connection
}

let shutdown: (done: Mocha.Done) => Promise<void>

const { APP_PORT, NODE_ENV } = process.env

const isProduction = NODE_ENV === 'production'

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
