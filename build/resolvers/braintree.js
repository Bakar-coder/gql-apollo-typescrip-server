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
exports.BraintreeResolver = void 0;
const braintree_1 = require("braintree");
const type_graphql_1 = require("type-graphql");
const braintree_2 = require("../types/braintree");
const _constants_1 = require("../_constants");
const _constants_2 = require("../_constants");
const paymentGateway = new braintree_1.BraintreeGateway({
    environment: _constants_1.__prod__ ? braintree_1.Environment.Production : braintree_1.Environment.Sandbox,
    merchantId: _constants_2.BRAINTREE_MERCHANT_ID,
    publicKey: _constants_2.BRAINTREE_PUBLIC_KEY,
    privateKey: _constants_2.BRAINTREE_PRIVATE_KEY,
});
let BraintreeResolver = class BraintreeResolver {
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, clientToken } = yield paymentGateway.clientToken.generate({});
            return { success, clientToken };
        });
    }
    processPayment(amount, paymentMethodNonce) {
        return __awaiter(this, void 0, void 0, function* () {
            const { errors, success, transaction } = yield paymentGateway.transaction.sale({
                amount,
                paymentMethodNonce,
                options: { submitForSettlement: true },
            });
            return { errors, success, transaction };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => braintree_2.BraintreeTokenResponseType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BraintreeResolver.prototype, "getToken", null);
__decorate([
    type_graphql_1.Query(() => braintree_2.BraintreeTransactionResponseType),
    __param(0, type_graphql_1.Arg('amount')),
    __param(1, type_graphql_1.Arg('paymentMethodNonce')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BraintreeResolver.prototype, "processPayment", null);
BraintreeResolver = __decorate([
    type_graphql_1.Resolver()
], BraintreeResolver);
exports.BraintreeResolver = BraintreeResolver;
//# sourceMappingURL=braintree.js.map