import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { Product } from './Product';

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
  @Field(() => Int!)
  @PrimaryColumn()
  cartId: number;

  @Field(() => Int!)
  @PrimaryColumn()
  productId: number;

  @Field(() => Int!)
  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Product, (prod) => prod.cartItems)
  @JoinColumn()
  product: Product;
}
