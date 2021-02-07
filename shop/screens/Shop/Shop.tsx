import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import ProductsList from '../../components/ProductsList'
import { fetchProducts } from '../../store/actions/products'
import Colors from '../../constants/Colors'

type OwnProps = {
  navigation: any
}
const Shop: React.FC<OwnProps> = ({ navigation }) => {
  const products = useSelector((state: any) => state.products.products);
  const isLoading = useSelector((state: any) => state.products.isLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
    const focusSub = navigation.addListener('focus', () => {
      dispatch(fetchProducts())
    })
    return () => {
      // focusSub?.remove()
    }
  }, [])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && !products?.length) {
    return (
      <View style={styles.centered}>
        <Text>No products found</Text>
      </View>
    )
  }
  return (
    <ProductsList products={products} navigation={navigation} isShop />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Shop;
