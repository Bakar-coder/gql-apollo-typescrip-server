import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Product} from "./Product";
import {Order} from "./Order";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  
  @Field()
  @PrimaryColumn()
  orderId: number
  
  @Field()
  @PrimaryColumn()
  productId: number
  
  @Field()
  @Column()
  quantity: number
  
  @Field()
  @Column({type: "numeric"})
  total: number

  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn()
  order: Order

  @ManyToOne(() => Product, prod => prod.cartItems)
  @JoinColumn()
  product: Product
}