import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux'

import ProductsList from '../../components/ProductsList'

type OwnProps = {
  navigation: any
}
const ManageProducts: React.FC<OwnProps> = ({ navigation }) => {
  const products = useSelector((state: any) => state.products.userProducts);
  if (!products?.length) {
    return (
      <View>
        <Text>No products found</Text>
      </View>
    )
  }
  return (
    <ProductsList products={products} navigation={navigation} />
  );
};

const styles = StyleSheet.create({});

export default ManageProducts;
