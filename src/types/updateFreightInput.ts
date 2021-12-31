import { Field, InputType, Int } from 'type-graphql'
import { RiskDefinition, ShippingMethod } from './createFreightInput'

@InputType({ description: 'update a freight from id' })
export class UpdateFreightInput {
  @Field(() => Int, { nullable: true })
  package_id: number

  @Field(() => ShippingMethod, { nullable: true })
  shipping_method: ShippingMethod

  @Field(() => Int, { nullable: true })
  quantity: number

  @Field(() => String, { nullable: true })
  origin_city: string

  @Field(() => String, { nullable: true })
  destination_city: string

  @Field(() => Boolean, { nullable: true })
  is_express: boolean

  @Field(() => Boolean, { nullable: true })
  have_insurance: boolean

  @Field(() => Int, { nullable: true })
  width: number

  @Field(() => Int, { nullable: true })
  weight: number

  @Field(() => Int, { nullable: true })
  length: number

  @Field(() => Int, { nullable: true })
  height: number

  @Field(() => RiskDefinition, { defaultValue: 'low', nullable: true })
  risk: RiskDefinition
}
