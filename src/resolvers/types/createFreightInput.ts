import { Field, InputType } from 'type-graphql'

@InputType({ description: 'create a new freight to organization' })
export class CreateFreightInput {
  @Field({ nullable: false })
  organization_id: number

  @Field()
  package_id: number

  @Field()
  shipping_method: string

  @Field()
  quantity: number

  @Field()
  origin_city: string

  @Field()
  destination_city: string

  @Field()
  is_express: boolean

  @Field()
  have_insurance: boolean

  @Field()
  total_cubage_weigth: number

  @Field()
  width: number

  @Field()
  weight: number

  @Field()
  length: number

  @Field()
  height: number

  @Field()
  risk: string
}
