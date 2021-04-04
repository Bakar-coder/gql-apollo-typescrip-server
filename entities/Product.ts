import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {CartItem} from "./CartItem";
import {Category} from "./Category";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  userId: number

  @Field()
  @Column()
  categoryId: number

  @Field()
  @Column({ unique: true })
  title: string

  @Field()
  @Column({ unique: true })
  slug: string

  @Field()
  @Column()
  stock: number

  @Field()
  @Column({ type: "numeric" })
  price: number

  @Field()
  @Column({ type: 'text' })
  description: string

  @Field()
  @Column({ type: "numeric", nullable: true })
  discount: number

  @Field()
  @Column({  default: null})
  discountExpiration: Date

  @Field()
  @Column({  nullable: true})
  tags: string

  @Field(() => [String])
  @Column({ type: 'text' })
  images: string[]

  @Field()
  @Column({ default: false })
  featured: boolean

  @Field()
  @Column({ default: true })
  published: boolean

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => CartItem, items => items.product)
  cartItems: CartItem[]

  @ManyToOne(() => User, user => user.products)
  @JoinColumn()
  user: User

  @ManyToOne(() => Category, cat => cat.products)
  @JoinColumn()
  category: Category
}