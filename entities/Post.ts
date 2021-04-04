import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()  
  @PrimaryGeneratedColumn()
  id: number
  
  @Field()
  @Column()
  title: string
  
  @Field()
  @Column({ type: 'text' })
  description: string
  
  @Field()
  @Column()
  image: string
  
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
}