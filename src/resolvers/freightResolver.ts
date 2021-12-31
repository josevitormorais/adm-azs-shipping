import { Freight } from '../datastore/entities/freight'
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { CreateFreightInput } from './types/createFreightInput'
import { UpdateFreightInput } from './types/updateFreightInput'
import { getConnection } from 'typeorm'

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
    return Freight.create(data).save()
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
