import { MaxLength, Min } from 'class-validator'
import { Field, InputType, Int } from 'type-graphql'
import { Risk, ShippingMethod } from './Enums'

@InputType({ description: 'update a freight from id' })
export class UpdateFreightInput {
  @Field(() => Int, { nullable: true })
  package_id: number

  @Field(() => ShippingMethod, { nullable: true })
  shipping_method: ShippingMethod

  @Min(1)
  @Field(() => Int, { nullable: true })
  quantity: number

  @MaxLength(30)
  @Field(() => String, { nullable: true })
  origin_city: string

  @MaxLength(30)
  @Field(() => String, { nullable: true })
  destination_city: string

  @Field(() => Boolean, { nullable: true })
  is_express: boolean

  @Field(() => Boolean, { nullable: true })
  have_insurance: boolean

  @Field(() => Int, { nullable: true })
  width: number

  @Min(1)
  @Field(() => Int, { nullable: true })
  weight: number

  @Min(1)
  @Field(() => Int, { nullable: true })
  length: number

  @Min(1)
  @Field(() => Int, { nullable: true })
  height: number

  @Field(() => Risk, { defaultValue: 'low', nullable: true })
  risk: Risk
}
