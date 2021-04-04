import { BaseEntity } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class CartItem extends BaseEntity {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => [String])
  images: string[];

  @Field(() => Int)
  quantity: number;
}
