import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCTS,
  ProductActionI,
  REMOVE_PRODUCT,
  SET_LOADING
} from '../actions/products';

import { products } from '../../data'
import Product from '../../models/Product'

const initialState = {
  products: products as Product[],
  userProducts: products.filter(({ ownerId }) => ownerId === 'u1') as Product[],
  isLoading: false
}
type State = typeof initialState;

const productsReducer = (state = initialState, action: ProductActionI | any): State => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
        userProducts: action.products,
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.product, ...state.products],
        userProducts: [action.product, ...state.userProducts]
      }
    case EDIT_PRODUCT:
      const prodIndex = state.products.findIndex(({ id }) => id === action.product.id)
      const upIndex = state.userProducts.findIndex(({ id }) => id === action.product.id)
      if (prodIndex === -1 && upIndex === -1) {
        return state
      }
      const uProds = [...state.userProducts]
      const prods = [...state.products]
      prods.splice(prodIndex, 1, action.product)
      uProds.splice(upIndex, 1, action.product)
      return { ...state, products: prods, userProducts: uProds }
    case REMOVE_PRODUCT:
      const productIndex = state.products.findIndex(({ id }) => id === action.productId)
      const uIndex = state.userProducts.findIndex(({ id }) => id === action.productId)
      if (productIndex === -1 && uIndex === -1) {
        return state
      }
      const usProds = [...state.userProducts];
      usProds.splice(uIndex, 1);
      const newProducts = [...state.products];
      newProducts.splice(productIndex, 1);
      return { ...state, products: newProducts, userProducts: usProds };
    default:
      return state;
  }
}

export default productsReducer;
