import { assert } from 'chai'

describe('01-create-freight-test', () => {
  let app: any

  before((done) => {
    done()
    app = require('../app')
  })

  after((done) => {
    app.shutdown(done)
  })

  it('Should server is running', async () => {
    await new Promise((resolve) => setTimeout(() => resolve(100), 3000))
    assert.strictEqual(app.url, process.env.APP_URL)
  })
})
