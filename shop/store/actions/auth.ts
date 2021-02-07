export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP = 'SIGNUP';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const signupRequest = (email: string, password: string) => {
  return {
    type: SIGNUP_REQUEST,
    payload: { email, password }
  }
}

export const signup = (data: any) => {
  return {
    type: SIGNUP,
    payload: data
  }
}
export const loginRequest = (email: string, password: string) => {
  return {
    type: LOGIN_REQUEST,
    payload: { email, password }
  }
}

export const login = (data: any) => {
  return {
    type: LOGIN,
    payload: data
  }
}

export const logout = ()=>{
  return {type:LOGOUT}
}
