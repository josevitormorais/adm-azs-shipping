import 'reflect-metadata'
import dotenv from 'dotenv-safe'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { Freight } from './datastore/entities/freight'
import { FreightResolver } from './resolvers/freightResolver'

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
    logger: 'advanced-console',
    logging: isDevelopment ? 'all' : undefined,
    cache: true,
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [FreightResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      repository: repository,
    }),
  })

  apolloServer.listen(parseInt(APP_PORT || '3000')).then(({ url }) => {
    if (repository.isConnected) {
      console.log('[POSTGRES] Database connected')
    }
    console.log(`🚀 Starting server on port: ${APP_PORT} and url: ${url}`)
  })
}

main().catch((err) => {
  console.log('Error to init application. Reason: ', err)
})
