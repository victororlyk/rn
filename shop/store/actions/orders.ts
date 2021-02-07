import { CartI } from '../reducers/cart'

export const ADD_NEW_ORDER = 'ADD_NEW_ORDER';

interface AddNewOrderI {
  type: typeof ADD_NEW_ORDER,
  order: CartI[]
}

export type OrderActionsI = AddNewOrderI

export const addNewOrder = (order: CartI[]): AddNewOrderI => {
  return {
    type: ADD_NEW_ORDER,
    order
  }
}
