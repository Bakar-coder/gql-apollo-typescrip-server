import { Category } from '../../entities/Category';
import { resolve } from 'path';
import { Product } from '../../entities/Product';
import { deleteFile } from '../../utils/deleteFile';
import { getConnection } from 'typeorm';
import { Arg, Ctx, Mutation, Resolver, Int, UseMiddleware } from 'type-graphql';
import { appContext } from '../../context';
import {
  ProductInputType,
  ProductResponseType,
  ProductUpdateInputType,
} from '../../types/product';
import { uploadedFiles } from '../../utils/getUploadedFiles';
import { isMerchant } from '../../middleware/auth';
import { validateProduct } from '../../validation/product';

@Resolver()
export class AdminProductResolver {
  @Mutation(() => ProductResponseType)
  @UseMiddleware(isMerchant)
  async addProduct(
    @Arg('opts') opts: ProductInputType,
    @Ctx() { req }: appContext
  ): Promise<ProductResponseType> {
    let {
      title,
      slug,
      stock,
      category,
      price,
      description,
      images,
      tags,
      discount,
      discountExpiration,
      featured,
      published,
    } = opts;
    const { error } = validateProduct(opts);

    const errorField = error?.details[0].message
      .split(' ')[0]
      .split('')
      .slice(1, -1)
      .join('');
    if (error)
      return { errors: [{ field: errorField, msg: error.details[0].message }] };

    const cate = category.split('/')[0];
    const subCate = category.split('/')[1];
    const subCate2 = category.split('/')[2];

    let prodCategory = await Category.findOne({ category: cate });
    const subCategory = await Category.findOne({ subCategory: subCate });
    const subCategory2 = await Category.findOne({ subCategory2: subCate2 });
    if (prodCategory?.category === category) prodCategory.category = category;
    prodCategory = await Category.create({
      category: prodCategory ? prodCategory.category : cate,
      subCategory: subCategory ? subCategory.subCategory : subCate,
      subCategory2: subCategory2 ? subCategory2.subCategory2 : subCate2,
    }).save();

    const file = await uploadedFiles(images);

    const product = await Product.create({
      title,
      slug,
      stock,
      price,
      description,
      tags,
      discount,
      discountExpiration,
      featured,
      published,
      images: file,
      userId: req.session.userId,
      categoryId: prodCategory && prodCategory.id,
    }).save();
    return { product };
  }

  @Mutation(() => ProductResponseType)
  @UseMiddleware(isMerchant)
  async updateProduct(
    @Arg('opts') opts: ProductUpdateInputType,
    @Ctx() { res }: appContext
  ): Promise<ProductResponseType> {
    let {
      id,
      title,
      slug,
      stock,
      category,
      price,
      description,
      images,
      tags,
      discount,
      discountExpiration,
      featured,
      published,
    } = opts;
    const product = await Product.findOne(id);
    if (!product)
      return {
        errors: [
          {
            msg: `failed to find product with id ${id}`,
          },
        ],
      };
    if (res.locals.user.seller && product.user.id !== res.locals.user.id)
      return {
        errors: [
          {
            msg:
              "Unauthorized, trying to update a product which doesn't belong to you.",
          },
        ],
      };

    if (images) {
      product.images.map((img) => deleteFile(resolve(img)));
      product.images = await uploadedFiles(images);
    }
    if (category) {
      const cate = category.split('/')[0];
      const subCate = category.split('/')[1];
      const subCate2 = category.split('/')[2];

      let prodCategory = await Category.findOne({ category: cate });
      const subCategory = await Category.findOne({ subCategory: subCate });
      const subCategory2 = await Category.findOne({ subCategory2: subCate2 });

      prodCategory = await Category.create({
        category: prodCategory ? prodCategory.category : cate,
        subCategory: subCategory ? subCategory.subCategory : subCate,
        subCategory2: subCategory2 ? subCategory2.subCategory2 : subCate2,
      }).save();

      product.categoryId = prodCategory.id;
    }
    product.title = title;
    product.slug = slug;
    product.stock = stock;
    product.price = price;
    product.description = description;
    if (tags) product.tags = tags;
    if (discount) product.discount = discount;
    if (discountExpiration)
      product.discountExpiration = new Date(discountExpiration);
    product.featured = featured;
    product.published = published;
    await product.save();

    return {
      product,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isMerchant)
  async deleteProduct(
    @Arg('id', () => Int) id: number,
    @Ctx() { res }: appContext
  ): Promise<boolean> {
    const product = await getConnection().manager.findOne(Product, {
      where: { id },
    });
    if (
      res.locals.user.seller &&
      product &&
      product.user.id !== res.locals.user.id
    )
      return false;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id = :id', { id })
      .execute();
    return true;
  }

  // @Query()
  // async download(@Ctx() { res }: appContext) {
  //   const resumeName = 'test-resume.zip';
  //   const pathName = join('data', 'resume', resumeName);
  //   const file = createReadStream(pathName);
  //   res.setHeader('Content-Type', 'application/force-download');
  //   res.setHeader(
  //     'Content-Disposition',
  //     `attachment; filename="${resumeName}"`
  //   );
  //   res.setHeader('X-SendFile', `${resumeName}`);
  //   file.pipe(res);
  // }
}
