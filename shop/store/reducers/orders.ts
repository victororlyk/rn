import { CartI } from './cart'
import { ADD_NEW_ORDER , OrderActionsI} from '../actions/orders'

export type OrderI = { date: Date, products: CartI[], sum: number, id: string }
const initialState = {
  orders: [] as OrderI[]
}

type State = typeof initialState;

const ordersReducer = (state = initialState, action: OrderActionsI):State => {
  switch (action.type) {
    case ADD_NEW_ORDER:
      const sum = action.order.reduce((acc: number, { item, qty }: CartI) => acc += item.price * qty, 0)
      const newOrder: OrderI = { products: action.order, date: new Date(), sum, id: new Date().toISOString() };
      return { ...state, orders: [newOrder, ...state.orders] };
    default:
      return state;
  }
}

export default ordersReducer
