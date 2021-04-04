import { getConnection } from 'typeorm';
import { CartItem as CartItemResponseType } from 'types/cart';
import { CartItem } from '../entities/CartItem';

export const getCart = async (
  cartId: number
): Promise<CartItemResponseType[]> => {
  let cartItem: CartItemResponseType;
  const cartItems: CartItemResponseType[] = [];

  const cart = await getConnection().manager.find(CartItem, {
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
};
