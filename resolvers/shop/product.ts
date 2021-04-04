import { Arg, Int, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Category } from '../../entities/Category';
import { Product } from '../../entities/Product';
import { ProductResponseType } from '../../types/product';


@Resolver()
export class ProductResolver {
@Query(() => ProductResponseType)
async product (
  @Arg('id', () => Int) id: number
): Promise<ProductResponseType> {
  if (!id) return { errors: [{ msg: `failed to product with id ${id}` }] }
  const product = await getConnection()
    .manager.findOne(Product, id, { relations: ['category', 'user'] })
  return {product}
}

@Query(() => [Product])
async products (): Promise<Product[]> {
  const products = await getConnection()
    .getRepository(Product)
    .find({ order: { id: 'DESC' }, relations: ['category', 'user'] })
  return products 
}

@Query(() => [Category])
async categories(): Promise<Category[]> {
  const categories = await getConnection()
    .getRepository(Category)
    .find({ order: { category: 'ASC' } || { subCategory: 'ASC' } || { subCategory2: 'ASC' } })
  return categories
}
}