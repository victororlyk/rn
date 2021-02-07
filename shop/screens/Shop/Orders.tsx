import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux'
import OrderItem from '../../components/OrderItem'

type OwnProps = {}
const Orders: React.FC<OwnProps> = () => {
  const orders = useSelector((state: any) => state.orders.orders);


  return (
    <View style={styles.screen}>
      <Text style={styles.screenTitle}>Orders screen</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem amount={item.sum} products={item.products} date={item.date} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  orderDetailsContainer: {
    borderColor: 'black',
    borderStyle: 'dashed',
    borderWidth: 1,
    backgroundColor: 'pink',
    padding: 10
  },
  orderDetailsItem: {
    flexDirection: 'row',
    padding: 8
  }
});

export default Orders;
