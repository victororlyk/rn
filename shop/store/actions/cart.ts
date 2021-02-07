import Product from '../../models/Product'

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

interface AddToCartI {
  type: typeof ADD_TO_CART,
  product: Product
}

interface RemoveFromCartI {
  type: typeof REMOVE_FROM_CART,
  productId: string
}

interface ClearCartI {
  type: typeof CLEAR_CART
}

export type CartActionI = ClearCartI | RemoveFromCartI | AddToCartI;

export const addToCart = (product: Product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const removeFromCart = (productId: string) => {
  return {
    type: REMOVE_FROM_CART,
    productId
  }
};

export const clearCart = () => {
  return { type: CLEAR_CART }
}
