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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const CartItem_1 = require("./CartItem");
const Category_1 = require("./Category");
const type_graphql_1 = require("type-graphql");
let Product = class Product extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "numeric" }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "numeric", nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", Date)
], Product.prototype, "discountExpiration", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "featured", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "published", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => CartItem_1.CartItem, items => items.product),
    __metadata("design:type", Array)
], Product.prototype, "cartItems", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.products),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], Product.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Category_1.Category, cat => cat.products),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Category_1.Category)
], Product.prototype, "category", void 0);
Product = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map