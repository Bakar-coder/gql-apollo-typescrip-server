"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProductResolver = void 0;
const Category_1 = require("../../entities/Category");
const path_1 = require("path");
const Product_1 = require("../../entities/Product");
const deleteFile_1 = require("../../utils/deleteFile");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const product_1 = require("../../types/product");
const getUploadedFiles_1 = require("../../utils/getUploadedFiles");
const auth_1 = require("../../middleware/auth");
const product_2 = require("../../validation/product");
let AdminProductResolver = class AdminProductResolver {
    addProduct(opts, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let { title, slug, stock, category, price, description, images, tags, discount, discountExpiration, featured, published, } = opts;
            const { error } = product_2.validateProduct(opts);
            const errorField = error === null || error === void 0 ? void 0 : error.details[0].message.split(' ')[0].split('').slice(1, -1).join('');
            if (error)
                return { errors: [{ field: errorField, msg: error.details[0].message }] };
            const cate = category.split('/')[0];
            const subCate = category.split('/')[1];
            const subCate2 = category.split('/')[2];
            let prodCategory = yield Category_1.Category.findOne({ category: cate });
            const subCategory = yield Category_1.Category.findOne({ subCategory: subCate });
            const subCategory2 = yield Category_1.Category.findOne({ subCategory2: subCate2 });
            if ((prodCategory === null || prodCategory === void 0 ? void 0 : prodCategory.category) === category)
                prodCategory.category = category;
            prodCategory = yield Category_1.Category.create({
                category: prodCategory ? prodCategory.category : cate,
                subCategory: subCategory ? subCategory.subCategory : subCate,
                subCategory2: subCategory2 ? subCategory2.subCategory2 : subCate2,
            }).save();
            const file = yield getUploadedFiles_1.uploadedFiles(images);
            const product = yield Product_1.Product.create({
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
        });
    }
    updateProduct(opts, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, title, slug, stock, category, price, description, images, tags, discount, discountExpiration, featured, published, } = opts;
            const product = yield Product_1.Product.findOne(id);
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
                            msg: "Unauthorized, trying to update a product which doesn't belong to you.",
                        },
                    ],
                };
            if (images) {
                product.images.map((img) => deleteFile_1.deleteFile(path_1.resolve(img)));
                product.images = yield getUploadedFiles_1.uploadedFiles(images);
            }
            if (category) {
                const cate = category.split('/')[0];
                const subCate = category.split('/')[1];
                const subCate2 = category.split('/')[2];
                let prodCategory = yield Category_1.Category.findOne({ category: cate });
                const subCategory = yield Category_1.Category.findOne({ subCategory: subCate });
                const subCategory2 = yield Category_1.Category.findOne({ subCategory2: subCate2 });
                prodCategory = yield Category_1.Category.create({
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
            if (tags)
                product.tags = tags;
            if (discount)
                product.discount = discount;
            if (discountExpiration)
                product.discountExpiration = new Date(discountExpiration);
            product.featured = featured;
            product.published = published;
            yield product.save();
            return {
                product,
            };
        });
    }
    deleteProduct(id, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield typeorm_1.getConnection().manager.findOne(Product_1.Product, {
                where: { id },
            });
            if (res.locals.user.seller &&
                product &&
                product.user.id !== res.locals.user.id)
                return false;
            yield typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(Product_1.Product)
                .where('id = :id', { id })
                .execute();
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => product_1.ProductResponseType),
    type_graphql_1.UseMiddleware(auth_1.isMerchant),
    __param(0, type_graphql_1.Arg('opts')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_1.ProductInputType, Object]),
    __metadata("design:returntype", Promise)
], AdminProductResolver.prototype, "addProduct", null);
__decorate([
    type_graphql_1.Mutation(() => product_1.ProductResponseType),
    type_graphql_1.UseMiddleware(auth_1.isMerchant),
    __param(0, type_graphql_1.Arg('opts')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_1.ProductUpdateInputType, Object]),
    __metadata("design:returntype", Promise)
], AdminProductResolver.prototype, "updateProduct", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(auth_1.isMerchant),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminProductResolver.prototype, "deleteProduct", null);
AdminProductResolver = __decorate([
    type_graphql_1.Resolver()
], AdminProductResolver);
exports.AdminProductResolver = AdminProductResolver;
//# sourceMappingURL=products.js.map