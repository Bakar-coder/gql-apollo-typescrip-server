import { FileUpload } from 'context';
import { GraphQLUpload } from 'graphql-upload';
import { Field, InputType, ObjectType, Int, Float } from 'type-graphql';
import { Product } from '../entities/Product';
import { ErrorField } from './error';

@InputType()
export class ProductInputType {
  @Field()
  title: string;

  @Field()
  slug: string;

  @Field(() => Int)
  stock: number;

  @Field()
  price: number;

  @Field()
  category: string;

  @Field(() => Float, { nullable: true })
  discount: number;

  @Field(() => String, { nullable: true })
  discountExpiration: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  tags: string;

  @Field(() => [GraphQLUpload])
  images: FileUpload[];

  @Field(() => Boolean, { nullable: true })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}


@InputType()
export class ProductUpdateInputType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field(() => Int)
  stock: number;

  @Field()
  price: number;

  @Field()
  category: string;

  @Field(() => Float, { nullable: true })
  discount: number;

  @Field(() => String, { nullable: true })
  discountExpiration: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  tags: string;

  @Field(() => [GraphQLUpload], { nullable: true })
  images?: FileUpload[];

  @Field(() => Boolean, { nullable: true })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}

@ObjectType()
export class ProductResponseType {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => Product, { nullable: true })
  product?: Product;
}
