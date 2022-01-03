import { MaxLength, Min } from 'class-validator'
import { Field, InputType, Int } from 'type-graphql'
import { Risk, ShippingMethod } from './enums'

@InputType({ description: 'create a new freight to organization' })
export class CreateFreightInput {
  @Field(() => Int)
  organization_id: number

  @Field(() => Int)
  package_id: number

  @Field(() => ShippingMethod)
  shipping_method: ShippingMethod

  @Min(1)
  @Field(() => Int)
  quantity: number

  @MaxLength(30)
  @Field(() => String)
  origin_city: string

  @MaxLength(30)
  @Field(() => String)
  destination_city: string

  @Field(() => Boolean)
  is_express: boolean

  @Field(() => Boolean)
  have_insurance: boolean

  @Field(() => Int)
  width: number

  @Min(1)
  @Field(() => Int)
  weight: number

  @Min(1)
  @Field(() => Int)
  length: number

  @Min(1)
  @Field(() => Int)
  height: number

  @Field(() => Risk, { defaultValue: 'low', nullable: true })
  risk: Risk
}
