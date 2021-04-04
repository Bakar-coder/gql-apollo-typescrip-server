"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateProduct = (opts) => {
    const { title, slug, stock, price, discount, discountExpiration, description, images, category, tags, published, featured } = opts;
    return joi_1.default.object({
        title: joi_1.default.string().required(),
        slug: joi_1.default.string().required(),
        stock: joi_1.default.number().required(),
        category: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        discount: joi_1.default.number(),
        discountExpiration: joi_1.default.date(),
        description: joi_1.default.string().required(),
        images: joi_1.default.array().required(),
        tags: joi_1.default.string(),
        featured: joi_1.default.boolean(),
        published: joi_1.default.boolean(),
    }).validate({ title, slug, stock, price, discount, discountExpiration, description, images, category, tags, published, featured });
};
//# sourceMappingURL=product.js.map