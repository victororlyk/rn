import React, { useReducer, useState } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

import Input from '../components/Input'
import Colors from '../constants/Colors'
import { loginRequest, signupRequest } from '../store/actions/auth'

const initialState = {
  values: {
    email: '',
    password: ''
  },
  validities: {
    email: true,
    password: true
  },
  isFormValid: true
}

type State = typeof initialState;

function reducer(state: State, action: { type: string, field: string, isValid?: boolean, value?: string }) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value

        },
        validities: {
          ...state.validities,
          [action.field]: action.isValid
        }
      }
    default:
      return state;
  }
}

type OwnProps = {}
const Auth: React.FC<OwnProps> = () => {
  const [state, setState] = useReducer(reducer, initialState)
  const [isSignUp, setIsSignUp] = useState(false)

  const dispatch = useDispatch();

  const changeField = (field: string, value: string) => {
    setState({ type: 'SET_FIELD', isValid: true, field, value })
  }

  const authHandler = () => {
    if (isSignUp) {
      dispatch(signupRequest(state.values.email, state.values.password))
      setIsSignUp(false)
    } else {
      dispatch(loginRequest(state.values.email, state.values.password))
    }
  }
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={styles.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>

        <View style={styles.authContainer}>
          <ScrollView>
            <Input value={state.values.email}
                   changeField={changeField}
                   fieldName='email'
                   error={state.validities.email}
                   errorMessage='Email is not valid'
                   keyboardType='default'
                   label="Email"
                   autoCapitalize='none'
                   placeholder="Email address"
            />
            <Input value={state.values.password}
                   changeField={changeField}
                   fieldName='password'
                   error={state.validities.password}
                   errorMessage='password is not valid'
                   keyboardType='default'
                   label="Password"
                   secureTextEntry
                   autoCapitalize='none'
                   placeholder="password address"
            />
            <View style={styles.buttonContainer}><Button title={isSignUp ? "Sign UP" : 'Login'} color={Colors.primary}
                                                         onPress={authHandler} /></View>
            <View style={styles.buttonContainer}><Button title={`Switch to ${isSignUp ? 'Login' : 'Sign up'}`}
                                                         color={Colors.accent}
                                                         onPress={() => {
                                                           setIsSignUp(prevState => !prevState)
                                                         }} /></View>
          </ScrollView>
          <Text>Auth</Text>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    borderRadius: 5,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 15
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default Auth;
