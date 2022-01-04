const { Freight } = require('./src/datastore/entities/Freight')

module.exports = [
  {
    name: 'development',
    type: 'postgres',
    port: Number(process.env.PG_PORT),
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [Freight],
    synchronize: true,
    logging: true,
    migrations:
      process.env.NODE_ENV !== 'production'
        ? ['src/datastore/migrations/**/*.ts"']
        : undefined,
    cli: {
      entitiesDir: 'src/datastore/entities',
      migrationsDir: 'src/datastore/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'test',
    password: 'test',
    database: 'test',
    synchronize: true,
    migrations: ['src/datastore/migrations/**/*.ts"'],
    entities: ['src/datastore/entities/**/*.ts'],
    cli: {
      entitiesDir: 'src/datastore/entities',
      migrationsDir: 'src/datastore/migrations',
    },
  },
]
