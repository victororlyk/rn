import React from 'react';
import { Alert, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux'

import Product from '../models/Product'
import { addToCart } from '../store/actions/cart'
import { removeProduct } from '../store/actions/products'
import Colors from '../constants/Colors'

const renderProduct = (navigation: any, handleAddToCart: any, isShop: boolean, dispatch: any, { item }: { item: Product },) => {
  const deleteProduct = () => {
    Alert.alert('Are you sure', 'you want to delete product', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes', style: 'destructive', onPress: () => {
          dispatch(removeProduct(item.id));
        }
      }

    ])

  }
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item?.price?.toFixed(2)}$</Text>
      </View>
      {isShop ? (
          <View style={styles.buttonsContainer}>
            <Button
              title="Details"
              color={Colors.primary}
              onPress={() => {
                navigation.navigate("ProductDetails", { productId: item.id })
              }} />
            <Button
              color={Colors.primary}
              title="Add to cart"
              onPress={handleAddToCart.bind(null, item)} />
          </View>)
        : (
          <View style={styles.buttonsContainer}>
            <Button
              title="Delete"
              onPress={deleteProduct} />
            <Button title="Edit" onPress={() => {
              navigation.navigate("EditProducts", { isAdding: false, product: item })
            }} />
          </View>
        )}
    </View>
  )
}

type OwnProps = {
  products: Product[];
  navigation: any;
  isShop?: boolean;
}
const ProductsList: React.FC<OwnProps> = ({ products, navigation, isShop }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={products} renderItem={renderProduct.bind(null, navigation, handleAddToCart, isShop, dispatch)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    padding: 10,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: .26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    height: 300
  },
  image: {
    width: '100%',
    height: '60%',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 25,
    fontFamily: 'open-sans-bold',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default ProductsList;
