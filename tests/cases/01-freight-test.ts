import { assert } from 'chai'
import { graphqlCall } from '../utils'
import { sever, shutdown } from '../app'
import { getConnection } from 'typeorm'
import { Freight } from '../../src/datastore/entities/Freight'

describe('01-freight-test', async () => {
  before(() => {
    return sever
      .then(() => getConnection())
      .then((conn) => conn.runMigrations())
  })

  after((done) => {
    shutdown(done)
  })

  const newFreight = {
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

  let newFreightId: number

  it('Should create a freight successfully', async () => {
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

    const { data } = await graphqlCall({
      source: registerFreightMutation,
      variableValues: {
        data: newFreight,
      },
    })

    Object.assign(newFreight, { ...data!.createFreight })
    newFreightId = data!.createFreight.id

    assert.isNotNull(data!.createFreight)
    assert.deepOwnInclude(data!.createFreight, newFreight)
    assert.deepEqual(data!.createFreight.total_cubage_weigth, 450)
  })

  it('Should find the freight throught id', async () => {
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
    const { data } = await graphqlCall({
      source: findFreightQuery,
      variableValues: {
        id: Number(newFreightId),
      },
    })

    assert.isNotNull(data!.findFreightById)
    assert.deepEqual(data!.findFreightById.id, newFreightId)
    assert.include(data!.findFreightById, newFreight)
  })

  it('Should updated a freight successfully', async () => {
    const freightToUpdate = {
      package_id: 312312,
      shipping_method: 'aereo',
      quantity: 4,
      destination_city: 'sao francisco',
      origin_city: 'uberlandia',
      have_insurance: false,
      is_express: false,
      height: 10,
      length: 10,
      width: 15,
      weight: 100,
      risk: 'high',
    }
    const updateFreightMutation = `
    mutation UpdateFreightById($id: Int!, $data: UpdateFreightInput!) {
      updateFreightById(id: $id, data: $data) {
        id
        organization_id
        package_id
        shipping_method
        quantity
        origin_city
        destination_city
        is_express
        have_insurance
        total_cubage_weigth
        width
        weight
        length
        height
        risk
        createdAt
        updatedAt
      }
    }
    `
    const { data } = await graphqlCall({
      source: updateFreightMutation,
      variableValues: {
        id: Number(newFreightId),
        data: freightToUpdate,
      },
    })

    assert.isNotNull(data!.updateFreightById)
    assert.deepEqual(data!.updateFreightById.id, newFreightId)
    assert.include(data!.updateFreightById, freightToUpdate)

    return getConnection()
      .getRepository(Freight)
      .findOne(newFreightId)
      .then((result: any) => {
        assert.isNotNull(result)
        assert.deepPropertyVal(result, 'destination_city', 'sao francisco')
        assert.deepPropertyVal(result, 'origin_city', 'uberlandia')
        assert.deepPropertyVal(result, 'have_insurance', false)
        assert.deepPropertyVal(result, 'is_express', false)
        assert.deepPropertyVal(result, 'shipping_method', 'aereo')
      })
  })

  it('Should delete a freight throught id successfully', async () => {
    const deleteFreightMutation = `
    mutation DeleteFreightById($id: Int!) {
      deleteFreightById(id: $id)
    }
    `
    const { data } = await graphqlCall({
      source: deleteFreightMutation,
      variableValues: {
        id: Number(newFreightId),
      },
    })

    assert.isBoolean(data!.deleteFreightById)
    assert.isTrue(data!.deleteFreightById)

    return getConnection()
      .getRepository(Freight)
      .findOne(newFreightId)
      .then((result: any) => {
        assert.isUndefined(result)
      })
  })
})
