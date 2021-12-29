import 'reflect-metadata'
import dotenv from 'dotenv-safe'
import express from 'express'

dotenv.config({ allowEmptyValues: true })

const app = express()

const { APP_PORT } = process.env

function main() {
  app.listen(APP_PORT, () => {
    console.log(`🚀 Starting server on port: ${APP_PORT}`)
  })
}

main()
