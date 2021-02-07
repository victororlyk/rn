import Product from '../../models/Product';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SET_LOADING = 'SET_LOADING';

interface FetchProductsI {
  type: typeof FETCH_PRODUCTS_REQUEST
}

interface SetLoadingI {
  type: typeof SET_LOADING,
  isLoading: boolean;
}

interface AddProductI {
  type: typeof ADD_PRODUCT_REQUEST,
  product: Product
}

interface EditProductI {
  type: typeof EDIT_PRODUCT,
  product: Product
}

interface RemoveProductI {
  type: typeof REMOVE_PRODUCT,
  productId: string
}

export type ProductActionI = RemoveProductI | AddProductI | EditProductI | FetchProductsI | SetLoadingI

export const setLoading = (isLoading: boolean): SetLoadingI => {
  return {
    type: SET_LOADING,
    isLoading
  }
}

export const fetchProducts = (): FetchProductsI => {
  return { type: FETCH_PRODUCTS_REQUEST }
}
export const addProduct = (product: Product): AddProductI => {
  return {
    type: ADD_PRODUCT_REQUEST,
    product
  }
}

export const editProduct = (product: Product): EditProductI => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}

export const removeProduct = (productId: string): RemoveProductI => {
  return {
    type: REMOVE_PRODUCT,
    productId
  }
}
