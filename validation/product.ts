import Joi from "joi";
import { ProductInputType } from "types/product";

export const validateProduct =  (opts: ProductInputType) => {
    const { title, slug, stock, price, discount, discountExpiration, description, images, category, tags, published, featured } =  opts
    return Joi.object({
      title: Joi.string().required(),
      slug: Joi.string().required(),
      stock: Joi.number().required(),
      category: Joi.string().required(),
      price: Joi.number().required(),
      discount: Joi.number(),
      discountExpiration: Joi.date(),
      description: Joi.string().required(),
      images: Joi.array().required(),
      tags: Joi.string(),
      featured: Joi.boolean(),
      published: Joi.boolean(),
    }).validate({ title, slug, stock, price, discount, discountExpiration, description, images, category, tags, published, featured })
  };