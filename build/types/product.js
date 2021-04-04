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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponseType = exports.ProductUpdateInputType = exports.ProductInputType = void 0;
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const Product_1 = require("../entities/Product");
const error_1 = require("./error");
let ProductInputType = class ProductInputType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInputType.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInputType.prototype, "slug", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ProductInputType.prototype, "stock", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ProductInputType.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInputType.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], ProductInputType.prototype, "discount", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductInputType.prototype, "discountExpiration", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInputType.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductInputType.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(() => [graphql_upload_1.GraphQLUpload]),
    __metadata("design:type", Array)
], ProductInputType.prototype, "images", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ProductInputType.prototype, "featured", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ProductInputType.prototype, "published", void 0);
ProductInputType = __decorate([
    type_graphql_1.InputType()
], ProductInputType);
exports.ProductInputType = ProductInputType;
let ProductUpdateInputType = class ProductUpdateInputType {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ProductUpdateInputType.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductUpdateInputType.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductUpdateInputType.prototype, "slug", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ProductUpdateInputType.prototype, "stock", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ProductUpdateInputType.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductUpdateInputType.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], ProductUpdateInputType.prototype, "discount", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductUpdateInputType.prototype, "discountExpiration", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductUpdateInputType.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductUpdateInputType.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(() => [graphql_upload_1.GraphQLUpload], { nullable: true }),
    __metadata("design:type", Array)
], ProductUpdateInputType.prototype, "images", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ProductUpdateInputType.prototype, "featured", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ProductUpdateInputType.prototype, "published", void 0);
ProductUpdateInputType = __decorate([
    type_graphql_1.InputType()
], ProductUpdateInputType);
exports.ProductUpdateInputType = ProductUpdateInputType;
let ProductResponseType = class ProductResponseType {
};
__decorate([
    type_graphql_1.Field(() => [error_1.ErrorField], { nullable: true }),
    __metadata("design:type", Array)
], ProductResponseType.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Product_1.Product, { nullable: true }),
    __metadata("design:type", Product_1.Product)
], ProductResponseType.prototype, "product", void 0);
ProductResponseType = __decorate([
    type_graphql_1.ObjectType()
], ProductResponseType);
exports.ProductResponseType = ProductResponseType;
//# sourceMappingURL=product.js.map