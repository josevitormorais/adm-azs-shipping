import { Field, ID, ObjectType } from 'type-graphql'
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

  @Field({ nullable: false })
  @Column()
  organization_id: number

  @Field()
  @Column()
  package_id: number

  @Field()
  @Column()
  shipping_method: string

  @Field()
  @Column()
  quantity: number

  @Field()
  @Column()
  origin_city: string

  @Field()
  @Column()
  destination_city: string

  @Field()
  @Column()
  is_express: boolean

  @Field()
  @Column()
  have_insurance: boolean

  @Field()
  @Column()
  total_cubage_weigth: number

  @Field()
  @Column()
  width: number

  @Field()
  @Column()
  weight: number

  @Field()
  @Column()
  length: number

  @Field()
  @Column()
  height: number

  @Field()
  @Column()
  risk: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
