import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import { clearCart, removeFromCart } from '../../store/actions/cart';
import { addNewOrder } from '../../store/actions/orders'
import { CartI } from '../../store/reducers/cart';
import Colors from '../../constants/Colors'
import CartItem from '../../components/CartItem'

type OwnProps = {}
const Cart: React.FC<OwnProps> = () => {
  const dispatch = useDispatch();

  const cartOrders = useSelector((state: any) => state.cart.cart);
  const sum = cartOrders.reduce((acc: number, {
    item,
    qty
  }: CartI) => acc += item.price * qty, 0);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handlePlaceOrder = () => {
    dispatch(addNewOrder(cartOrders))
    dispatch(clearCart())
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total sum: <Text style={styles.amount}> {sum.toFixed(2)}$</Text></Text>
        <Button title="Order Now" onPress={handlePlaceOrder} disabled={!cartOrders.length} />
      </View>
      <FlatList
        data={cartOrders}
        keyExtractor={({ item }) => item.id}
        renderItem={({ item: { item, qty } }) => {
          return (
            <CartItem
              title={item.title}
              qty={qty}
              deletable
              amount={item.price * qty}
              onRemove={() => {
                handleRemove(item.id)
              }} />)
        }} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: .26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.accent
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qty: {
    marginRight: 8
  }
});

export default Cart;
