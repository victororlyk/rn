import { call, put, takeEvery } from "redux-saga/effects";

import * as APIProducts from '../../api/products'
import {
  ADD_PRODUCT,
  ADD_PRODUCT_REQUEST,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_REQUEST,
  setLoading
} from '../actions/products';

function* postProduct(action: any) {
  try {
    const product = yield call(APIProducts.createProduct, action.product);
    const id = product.data.name
    yield put({ type: ADD_PRODUCT, product: { id, ...action.product } })
  } catch (e) {
    console.log(e, 'here ee')
  }
}

function* fetchProducts() {
  try {
    yield put(setLoading(true))
    const products = yield call(APIProducts.fetchProducts);
    const loadedProducts = Object.entries(products.data)
                                 .map(([id, product]: any) => {
                                   return {
                                     id,
                                     ...product
                                   }
                                 })
    yield put({ type: FETCH_PRODUCTS, products: loadedProducts })
  } catch (error) {
    console.log(error)
  } finally {
    yield put(setLoading(false))
  }
}

function* watchProducts() {
  yield takeEvery(ADD_PRODUCT_REQUEST, postProduct);
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts)
}

export default watchProducts;
