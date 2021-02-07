import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import Product from '../../models/Product'
import { addToCart } from '../../store/actions/cart'

type OwnProps = {}
const ProductDetails: React.FC<OwnProps> = ({ route }: any) => {
  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.products.products.find(({ id }: Product) => id === route.params.productId));
  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <ScrollView>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: product.imageUrl }} />
        <View style={styles.row}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price.toFixed(2)}$</Text>
        </View>
        <Text>{product.description}</Text>
        <Button
          title="Add to cart"
          onPress={() => {
            handleAddToCart()
          }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    margin: 15,
    backgroundColor: '#ccc',
    borderRadius: 10
  },
  image: {
    width: '100%',
    height: 500,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
  },
});

export default ProductDetails;
