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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const OrderItem_1 = require("./OrderItem");
const type_graphql_1 = require("type-graphql");
let Order = class Order extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: 'int4' }),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => OrderItem_1.OrderItem, item => item.order),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.orders),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
Order = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map