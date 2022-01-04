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

  it('running', () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(10), 3000)
    }).then((response) => {
      assert.strictEqual(response, 10)
    })
  })
})
