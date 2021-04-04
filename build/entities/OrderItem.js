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
exports.OrderItem = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const Order_1 = require("./Order");
const type_graphql_1 = require("type-graphql");
let OrderItem = class OrderItem extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], OrderItem.prototype, "productId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "numeric" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "total", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Order_1.Order, order => order.orderItems),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Order_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Product_1.Product, prod => prod.cartItems),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Product_1.Product)
], OrderItem.prototype, "product", void 0);
OrderItem = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=OrderItem.js.map