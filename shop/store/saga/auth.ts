import { call, put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login, LOGIN_REQUEST, signup, SIGNUP_REQUEST } from '../actions/auth'
import * as AuthAPI from '../../api/auth';

const saveDataToStorage = (token: string, userId: string, expDate: Date) => {
  AsyncStorage.setItem('userData', JSON.stringify({ token, userId, expDate: expDate.toISOString() }));
}

function* signupS({ email, password }: any) {
  try {
    const auth = yield call(AuthAPI.signup, email, password)
    const expDate = new Date(new Date().getTime() + Number(auth.data.expiresIn) * 1000);
    saveDataToStorage(auth.data.idToken, auth.data.localId, expDate)
    yield put(signup(auth))
  } catch (error) {
    console.log(error, 'here error')
  }
}

function* loginS({ payload: { email, password } }: any) {
  try {
    const auth = yield call(AuthAPI.login, email, password);
    const expDate = new Date(new Date().getTime() + Number(auth.data.expiresIn) * 1000);
    saveDataToStorage(auth.data.idToken, auth.data.localId, expDate);
    yield put(login(auth))
  } catch (error) {
    console.log(error, 'here error')
  }
}


function* watchAuth() {
  yield takeEvery(SIGNUP_REQUEST, signupS);
  yield takeEvery(LOGIN_REQUEST, loginS);
}

export default watchAuth;
