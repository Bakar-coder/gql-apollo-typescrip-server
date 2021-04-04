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
exports.UserType = exports.UserRegisterInputType = void 0;
const type_graphql_1 = require("type-graphql");
const cart_1 = require("./cart");
const error_1 = require("./error");
const User_1 = require("../entities/User");
let UserRegisterInputType = class UserRegisterInputType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegisterInputType.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegisterInputType.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegisterInputType.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegisterInputType.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegisterInputType.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegisterInputType.prototype, "password2", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], UserRegisterInputType.prototype, "seller", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], UserRegisterInputType.prototype, "admin", void 0);
UserRegisterInputType = __decorate([
    type_graphql_1.InputType()
], UserRegisterInputType);
exports.UserRegisterInputType = UserRegisterInputType;
let UserType = class UserType {
};
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserType.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [cart_1.CartItem], { nullable: true }),
    __metadata("design:type", Array)
], UserType.prototype, "cart", void 0);
__decorate([
    type_graphql_1.Field(() => [error_1.ErrorField], { nullable: true }),
    __metadata("design:type", Array)
], UserType.prototype, "errors", void 0);
UserType = __decorate([
    type_graphql_1.ObjectType()
], UserType);
exports.UserType = UserType;
//# sourceMappingURL=user.js.map