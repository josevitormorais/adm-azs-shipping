import { MaxLength, Min } from 'class-validator'
import { Field, InputType, Int, registerEnumType } from 'type-graphql'

export enum RiskDefinition {
  high = 'high',
  low = 'low',
  medium = 'medium',
}

export enum ShippingMethod {
  aereo = 'aereo',
  rodoviario = 'rodoviario',
  hidroviario = 'hidroviario',
}

registerEnumType(ShippingMethod, {
  name: 'ShippingMethod',
  description: 'This defines the shipping model',
})

registerEnumType(RiskDefinition, {
  name: 'RiskDefinition',
  description: 'This define what is possible value of risk the freight',
})

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

  @Field(() => RiskDefinition, { defaultValue: 'low', nullable: true })
  risk: RiskDefinition
}
