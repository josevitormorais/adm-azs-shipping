import { Freight } from '../datastore/entities/freight'
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { CreateFreightInput } from '../types/createFreightInput'
import { UpdateFreightInput } from '../types/updateFreightInput'
import { getConnection } from 'typeorm'

const defaultCubageFactor = {
  aereo: 166.7,
  rodoviario: 300,
  hidroviario: 1000,
}

const calculateCubageFreight = (
  height: number,
  length: number,
  width: number,
  cubageFactor: number
): number => {
  const transformCentimetersToMeters = (value: number): number => value / 100
  const kiloGram = 1000

  const calcResult = [height, length, width].reduce(
    (previousValue, currentValue) => {
      if (previousValue === 0) {
        return (previousValue = transformCentimetersToMeters(currentValue))
      }
      return (previousValue =
        transformCentimetersToMeters(currentValue) * previousValue)
    },
    0
  )

  return Number(calcResult * cubageFactor * kiloGram)
}

@Resolver(Freight)
export class FreightResolver {
  async findFreightByIdOnRepository(id: number): Promise<Freight | undefined> {
    return Freight.findOne(id)
  }

  @Query(() => Freight, { nullable: true })
  async findFreightById(
    @Arg('id', () => Int) id: number
  ): Promise<Freight | undefined> {
    return this.findFreightByIdOnRepository(id)
  }

  @Mutation(() => Freight)
  async createFreight(
    @Arg('data') data: CreateFreightInput
  ): Promise<CreateFreightInput> {
    const { width, height, length, shipping_method: shippingMethod } = data

    const cubage = calculateCubageFreight(
      width,
      height,
      length,
      defaultCubageFactor[shippingMethod]
    )

    return Freight.create(
      Object.assign(data, { total_cubage_weigth: cubage })
    ).save()
  }

  @Mutation(() => Freight, { nullable: true })
  async updateFreightById(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateFreightInput
  ): Promise<Freight | undefined> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Freight)
      .set(data)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return result.raw[0]
  }

  @Mutation(() => Boolean)
  async deleteFreightById(@Arg('id', () => Int) id: number): Promise<Boolean> {
    const { affected } = await Freight.delete({ id })
    return affected ? true : false
  }
}
