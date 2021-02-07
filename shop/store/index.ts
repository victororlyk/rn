import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects'

import productsReducer from './reducers/products'
import cartReducer from './reducers/cart';
import ordersReducer from './reducers/orders';
import authReducer from './reducers/auth'

import watchProducts from './saga/products'
import watchAuth from './saga/auth'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})

function* rootSaga() {
  yield fork(watchProducts);
  yield fork(watchAuth)
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
