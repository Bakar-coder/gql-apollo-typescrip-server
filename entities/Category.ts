import { ObjectType, Field } from "type-graphql";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  
  @Field()   
  @PrimaryGeneratedColumn()
  id: number
  
  @Field()   
  @Column()
  category: string
  
  @Field(() => String, {  nullable: true }) 
  @Column({ default: null })
  subCategory: string
  
  @Field(() => String, {  nullable: true }) 
  @Column({ default: null })
  subCategory2: string

  @OneToMany(() => Product, prod => prod.category)
  products: Product[]
}