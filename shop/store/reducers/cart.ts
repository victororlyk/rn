import { ADD_TO_CART, CartActionI, CLEAR_CART, REMOVE_FROM_CART } from '../actions/cart'
import Product from '../../models/Product'

export interface CartI {
  item: Product,
  qty: number
}

const initialState = {
  cart: [] as CartI[]
}

type State = typeof initialState;

const cartReducer = (state = initialState, action: CartActionI): State => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.cart.findIndex(({ item }: CartI) => item.id === action.product.id)
      if (existingProductIndex !== -1) {
        const newCart = [...state.cart];
        newCart[existingProductIndex].qty += 1;
        return { ...state, cart: newCart }
      }
      return { ...state, cart: [...state.cart, { item: action.product, qty: 1 }] }
    case REMOVE_FROM_CART:
      const productIndex = state.cart.findIndex(({ item }: CartI) => item.id === action.productId);
      if (productIndex !== -1) {
        const newCart = [...state.cart]
        newCart.splice(productIndex, 1)
        return { ...state, cart: newCart }
      }
      return state
    case CLEAR_CART:
      return { ...initialState };
    default:
      return state;
  }
}
export default cartReducer;
