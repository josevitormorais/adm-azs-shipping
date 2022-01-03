import { Risk, ShippingMethod } from '../../types/enums'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Freight extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Int)
  @Column()
  organization_id: number

  @Field(() => Int)
  @Column()
  package_id: number

  @Field(() => ShippingMethod)
  @Column({ type: 'text' })
  shipping_method: ShippingMethod

  @Field(() => Int)
  @Column()
  quantity: number
  @Field(() => String)
  @Column()
  origin_city: string

  @Field(() => String)
  @Column()
  destination_city: string

  @Field(() => Boolean)
  @Column()
  is_express: boolean

  @Field(() => Boolean)
  @Column()
  have_insurance: boolean

  @Field(() => Int)
  @Column()
  total_cubage_weigth: number

  @Field(() => Int)
  @Column()
  width: number

  @Field(() => Int)
  @Column()
  weight: number

  @Field(() => Int)
  @Column()
  length: number

  @Field(() => Int)
  @Column()
  height: number

  @Field(() => Risk, { defaultValue: 'low' })
  @Column({ type: 'text' })
  risk: Risk

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
