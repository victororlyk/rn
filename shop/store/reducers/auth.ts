import { LOGIN, LOGOUT } from '../actions/auth'

const initialState = {
  isLoggedIn: false
}
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload.data
      }
    case LOGOUT: {
      return {
        isLoggedIn: false,
      }
    }
    default:
      return state;
  }
}

export default authReducer
