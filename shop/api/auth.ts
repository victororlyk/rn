import axios from 'axios';

export const signup = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${process.env.API_AUTH}:signUp?key=${process.env.API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    })
    return res;
  } catch (error) {
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${process.env.API_AUTH}:signInWithPassword?key=${process.env.API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    })
    return res;
  } catch (error) {
    throw error;
  }
}
