import { assert } from 'chai'
import { graphqlCall } from '../utils'
import { sever, shutdown } from '../app'
import { getConnection } from 'typeorm'

describe('01-create-freight-test', () => {
  before(() => {
    return sever
      .then(() => getConnection())
      .then((conn) => conn.runMigrations())
  })

  after((done) => {
    shutdown(done)
  })

  const registerFreightMutation = `
  mutation($data: CreateFreightInput!) {
    createFreight(data: $data) {
        id,
        height,
        have_insurance,
        is_express,
        length
        total_cubage_weigth
        width
        weight
        risk
        createdAt
        updatedAt
        destination_city
        origin_city
        quantity
        shipping_method
        package_id
        organization_id
  }
}`

  it('Should create a freight successfully', async () => {
    const freight = {
      organization_id: 321312,
      package_id: 312312,
      shipping_method: 'rodoviario',
      quantity: 4,
      destination_city: 'sao paulo',
      origin_city: 'minas gerais',
      have_insurance: true,
      is_express: true,
      height: 10,
      length: 10,
      width: 15,
      weight: 100,
      risk: 'low',
    }

    const { data } = await graphqlCall({
      source: registerFreightMutation,
      variableValues: {
        data: freight,
      },
    })

    assert.isNotNull(data!.createFreight)
    assert.deepOwnInclude(data!.createFreight, freight)
    assert.deepEqual(data!.createFreight.total_cubage_weigth, 450)
  })

  it('Should validate height with value min', async () => {
    const newfreight = {
      organization_id: 321312,
      package_id: 312312,
      shipping_method: 'rodoviario',
      quantity: 4,
      destination_city: 'sao paulo',
      origin_city: 'minas gerais',
      have_insurance: true,
      is_express: true,
      height: 0,
      length: 10,
      width: 15,
      weight: 100,
      risk: 'low',
    }

    const { data } = await graphqlCall({
      source: registerFreightMutation,
      variableValues: {
        data: newfreight,
      },
    })

    assert.isNotNull(data!.createFreight)
    assert.deepEqual(data!.createFreight.total_cubage_weigth, 450)
  })
})

describe('02-find-freight-test', () => {
  const findFreightQuery = `
query FindFreightById($id: Int!) {
  findFreightById(id: $id) {
    id
    organization_id
    package_id
    shipping_method
    destination_city
    quantity
    origin_city
    is_express
    have_insurance
    total_cubage_weigth
    width
    weight
    length
    risk
    createdAt
    height
    updatedAt
  }
}`

  it('Should validate height with value min', async () => {
    const res = await graphqlCall({
      source: findFreightQuery,
      variableValues: {
        id: 4,
      },
    })
    console.log(res)
    console.log(res)
  })
})
