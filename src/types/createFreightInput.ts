import { Field, InputType, Int } from 'type-graphql'

export enum RiskDefinition {
  high = 'high',
  low = 'low',
  medium = 'medium',
}

@InputType({ description: 'create a new freight to organization' })
export class CreateFreightInput {
  @Field()
  organization_id: number

  @Field(() => Int)
  package_id: number

  @Field(() => String)
  shipping_method: string

  @Field(() => Int)
  quantity: number

  @Field(() => String)
  origin_city: string

  @Field(() => String)
  destination_city: string

  @Field(() => Boolean)
  is_express: boolean

  @Field(() => Boolean)
  have_insurance: boolean

  @Field(() => Int)
  width: number

  @Field(() => Int)
  weight: number

  @Field(() => Int)
  length: number

  @Field(() => Int)
  height: number

  @Field(() => RiskDefinition, { defaultValue: 'low' })
  risk: RiskDefinition
}
