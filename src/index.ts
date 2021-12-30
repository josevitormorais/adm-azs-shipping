import 'reflect-metadata'
import dotenv from 'dotenv-safe'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { createConnection } from 'typeorm'
import { Freight } from './datastore/entities/freight'

dotenv.config({ allowEmptyValues: true })

const {
  APP_PORT,
  PG_HOST,
  PG_PORT,
  PG_USERNAME,
  PG_PASSWORD,
  PG_DATABASE,
  ENVIRONMENT,
} = process.env

const app = express()

app.use(cors({ origin: '*' }))

const isDevelopment = ENVIRONMENT === 'dev'

async function main() {
  const repository = await createConnection({
    type: 'postgres',
    port: Number(PG_PORT),
    host: PG_HOST,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    entities: [Freight],
    synchronize: true,
    logger: 'advanced-console',
    logging: isDevelopment ? 'all' : undefined,
    cache: true,
  })

  // if (isDevelopment) {
  //   await repository.runMigrations()
  // }

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      repository: repository,
    }),
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })

  app.listen(parseInt(APP_PORT || '3000'), () => {
    console.log(`🚀 Starting server on port: ${APP_PORT}`)
  })
}

main().catch((err) => {
  console.log('Error to init application. Reason: ', err)
})
