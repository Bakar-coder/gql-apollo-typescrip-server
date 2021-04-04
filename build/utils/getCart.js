"use strict";
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
exports.getCart = void 0;
const typeorm_1 = require("typeorm");
const CartItem_1 = require("../entities/CartItem");
exports.getCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    let cartItem;
    const cartItems = [];
    const cart = yield typeorm_1.getConnection().manager.find(CartItem_1.CartItem, {
        where: { cartId },
        relations: ['product'],
    });
    cart.forEach((item) => {
        if (item) {
            cartItem.title = item.product.title;
            cartItem.price = item.product.price;
            cartItem.description = item.product.description;
            cartItem.images = item.product.images;
            cartItem.quantity = item.quantity;
            cartItems.push(cartItem);
        }
    });
    return cartItems;
});
//# sourceMappingURL=getCart.js.map