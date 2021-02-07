import React, { useCallback, useEffect, useReducer } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux'

import Product from '../../models/Product'
import { addProduct, editProduct } from '../../store/actions/products'
import Input from '../../components/Input'

enum ActionTypes {
  SET_TITLE = 'SET_TITLE',
  SET_PRICE = 'SET_PRICE',
  SET_DESCRIPTION = 'SET_DESCRIPTION',
  SET_IMAGE_URL = 'SET_IMAGE_URL',
}


const initialState = {
  values: {
    title: "",
    price: '',
    description: '',
    imageURL: "",
  },
  validities: {
    title: false,
    price: false,
    description: false,
    imageURL: false
  },
  formIsValid: false
}
type State = typeof initialState;

function reducer(state: any, action: { type: ActionTypes, payload: { text: string, isValid: boolean } }) {
  switch (action.type) {
    case ActionTypes.SET_TITLE:
      return {
        ...state,
        values: { ...state.values, title: action.payload.text },
        validities: { ...state.validities, title: action.payload.isValid },
        formIsValid: Object.values(state.validities)
                           .every(Boolean)
      };
    case ActionTypes.SET_PRICE:
      return {
        ...state,
        values: { ...state.values, price: action.payload.text },
        validities: { ...state.validities, price: action.payload.isValid },
        formIsValid: Object.values(state.validities)
                           .every(Boolean)
      };
    case ActionTypes.SET_DESCRIPTION:
      return {
        ...state,
        values: { ...state.values, description: action.payload.text },
        validities: { ...state.validities, description: action.payload.isValid },
        formIsValid: Object.values(state.validities)
                           .every(Boolean)
      };
    case ActionTypes.SET_IMAGE_URL:
      return {
        ...state,
        values: { ...state.values, imageURL: action.payload.text },
        validities: { ...state.validities, imageURL: action.payload.isValid },
        formIsValid: Object.values(state.validities)
                           .every(Boolean)
      };
    default:
      return state;
  }
}


type OwnProps = {}
const EditProduct: React.FC<OwnProps> = ({ route, navigation }: any) => {

  const dispatch = useDispatch();
  const product: Product = route.params.product;
  const isAdding: boolean = route.params.isAdding;

  function initState(): any {
    if (route.params.isAdding) {
      return initialState;
    } else {
      return {
        values: {
          title: product.title,
          imageURL: product.imageUrl,
          description: product.description,
          price: product.price.toString(),
        },
        validities: {
          title: true,
          price: true,
          description: true,
          imageURL: true
        },
        formIsValid: true
      }
    }
  }

  const [state, setState] = useReducer(reducer, initialState, initState)
  const changeField = (name: ActionTypes, value: string) => {

    let isValid = value.trim().length !== 0;
    if (name === ActionTypes.SET_PRICE && Number(value) < 0) {
      isValid = false
    }
    setState({ type: name, payload: { text: value, isValid } })
  }

  const saveChanges = useCallback(() => {
    if (!state.formIsValid) {
      Alert.alert('Wrong input', 'Please check the errors in the form.', [
        { text: "okay" }
      ])
      return
    }
    if (isAdding) {
      const newProduct = new Product(new Date().toISOString(), 'u1', state.values.title, Number(state.values.price), state.values.imageURL, state.values.description)
      dispatch(addProduct(newProduct))
    } else {
      const newProduct = { ...product };
      product.title = state.values.title;
      product.description = state.values.description;
      product.imageUrl = state.values.imageURL;
      dispatch(editProduct(newProduct));
    }
    navigation.goBack();

  }, [state]);

  useEffect(() => {
    navigation.setParams({
      saveChanges
    })
  }, [saveChanges])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.title}>Product details</Text>
          <Input
            value={state.values.title}
            errorMessage="Please enter a valid title"
            changeField={changeField}
            label="title"
            fieldName={ActionTypes.SET_TITLE}
            error={state.validities.title}
            placeholder="Product title"
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
          />
          <Input
            value={state.values.price}
            errorMessage="Please enter a valid price"
            changeField={changeField}
            label="price"
            placeholder="Product price"
            keyboardType='decimal-pad'
            fieldName={ActionTypes.SET_PRICE}
            error={state.validities.price}
          />
          <Input
            value={state.values.description}
            errorMessage="Please enter a valid description"
            changeField={changeField}
            fieldName={ActionTypes.SET_DESCRIPTION}
            error={state.validities.description}
            label="description"
            placeholder="Product description"
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
          />
          <Input
            value={state.values.imageURL}
            label="Image URL"
            errorMessage="Please enter a valid imageURL"
            changeField={changeField}
            fieldName={ActionTypes.SET_IMAGE_URL}
            error={state.validities.imageURL}
            placeholder="Product imageURL"

          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 15,
    margin: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
});

export default EditProduct;
