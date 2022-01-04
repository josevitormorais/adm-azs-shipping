### adm-azs-shipping

- Esse projeto consiste em uma API GRAPHQL para cadastro de fretes.

- Para rodar o projeto é necessario ter instalado.

  - NodeJS >= 14.x
  - Docker

#### Tecnologias utilizada no projeto:

- apollo-server
  https://www.apollographql.com/docs/

- typegraphql & class-validator
  https://typegraphql.com/

- cross-env
  https://github.com/kentcdodds/cross-env

- dotenv-safe
  https://github.com/rolodato/dotenv-safe

- graphql
  https://graphql.org/graphql-js/

- pg
  https://node-postgres.com/

- typeorm
  https://typeorm.io/#/

- typescript
  https://www.typescriptlang.org/

- Testes:
  - chai
    https://www.chaijs.com/
  - faker
    https://github.com/marak/Faker.js/
  - mocha:
    https://mochajs.org/

#### Arquitetura de diretorios do projeto

    adm-azs-shipping
    /src
    ├── createSchema.ts
    ├── datastore
    │   ├── entities
    │   │   └── Freight.ts
    │   └── migrations
    │       └── 1640743520207-initial_database.ts
    ├── errors
    │   └── InternalServerError.ts
    ├── index.ts
    ├── resolvers
    │   └── FreightResolver.ts
    ├── schema.gql
    ├── types
    │   ├── CreateFreightInput.ts
    │   ├── Enums.ts
    │   └── UpdateFreightInput.ts
    └── utils
        └── index.ts

#### Passos para rodar o projeto

- é preciso rodar os seguintes comandos:

1. Crie um arquivo na raiz do projeto chamado `.env` e depois Copie as variaveis de ambiente do arquivo` .env.example` para dentro dele.

2. docker-compose up -d
   Para rodar os bancos de dados de teste e de desenvolvimento

3. npm install:
   Para instalar as dependencias do projeto

4. npm run dev:
   Para iniciar a aplicação

- Voce pode acessar o apollo server studio localmente para começar a interagir com a aplicação
  http://localhost:5000/graphql

- Para rodar os testes basta rodar o seguinte comando:
  - npm run test
