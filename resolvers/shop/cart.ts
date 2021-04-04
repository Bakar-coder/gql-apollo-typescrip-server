import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { CartItem } from '../../entities/CartItem';
import { getConnection } from 'typeorm';
import { appContext } from '../../context';
import { getCart } from '../../utils/getCart';
import { CartItem as CartItemResponseType } from '../../types/cart';

@Resolver()
export class CartResolver {
  @Mutation(() => [CartItemResponseType])
  async addToCart(
    @Ctx() { res }: appContext,
    @Arg('id') id: number,
    @Arg('quantity') quantity: number
  ): Promise<CartItemResponseType[]> {
    let newQuantity = quantity ? quantity : 1;
    const user = res.locals.user;
    const cartId = user.cart.id;
    const cart = await getCart(cartId);
    const [item] = cart.filter((item) => item.id === id);

    if (!item) {
      const createdItem = await CartItem.create({
        cartId,
        productId: id,
        quantity: newQuantity,
      }).save();
      return await getCart(createdItem.cartId);
    }

    item.quantity = quantity ? quantity : item.quantity + 1;
    await item.save();
    return await getCart(cartId);
  }

  @Mutation(() => [CartItemResponseType])
  async decrementCartItem(
    @Ctx() { res }: appContext,
    @Arg('id') id: number,
    @Arg('quantity') quantity: number
  ): Promise<CartItemResponseType[]> {
    const cart = await getCart(res.locals.user.cartId);
    const [item] = cart.filter((item) => item.id === id);
    item.quantity = quantity ? quantity : item.quantity - 1;
    await item.save();
    const cartProducts = cart.map((prod) =>
      prod.id === item.id ? item : prod
    );
    return cartProducts;
  }

  @Mutation(() => Boolean)
  async removeCartItem(
    @Ctx() { res }: appContext,
    @Arg('id') id: number
  ): Promise<boolean> {
    const cartId = res.locals.user.cartId;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where('"cartId" = :cartId', { cartId })
      .andWhere('"productId" = :id', { id })
      .execute();
    return true;
  }

  @Mutation(() => Boolean)
  async clearCart(@Ctx() { res }: appContext): Promise<boolean> {
    const cartId = res.locals.user.cartId;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where('"cartId" = :cartId', { cartId })
      .execute();

    return true;
  }
}
