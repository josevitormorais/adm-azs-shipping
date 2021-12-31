import { Field, InputType } from 'type-graphql'

@InputType({ description: 'update a freight from id' })
export class UpdateFreightInput {
  @Field({ nullable: true })
  package_id: number

  @Field({ nullable: true })
  shipping_method: string

  @Field({ nullable: true })
  quantity: number

  @Field({ nullable: true })
  origin_city: string

  @Field({ nullable: true })
  destination_city: string

  @Field({ nullable: true })
  is_express: boolean

  @Field({ nullable: true })
  have_insurance: boolean

  @Field({ nullable: true })
  total_cubage_weigth: number

  @Field({ nullable: true })
  width: number

  @Field({ nullable: true })
  weight: number

  @Field({ nullable: true })
  length: number

  @Field({ nullable: true })
  height: number

  @Field({ nullable: true })
  risk: string
}
