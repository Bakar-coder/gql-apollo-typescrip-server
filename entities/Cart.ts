import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { CartItem } from './CartItem';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Cart extends BaseEntity {
  @Field(() => Int!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'int4' })
  userId: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (item) => item.cart)
  cartItems: CartItem[];
}
