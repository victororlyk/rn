import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors'
import CartItem from './CartItem'

type OwnProps = {
  amount: number;
  date: Date;
  products: any[];
}
const OrderItem: React.FC<OwnProps> = ({ amount, date, products }) => {
  const [showDetails, setShowDetails] = useState(false);


  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date.toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</Text>
      </View>
      <Button color={Colors.primary} title={showDetails ? "Hide Details" : "Show Details"}
              onPress={() => setShowDetails(prevState => !prevState)} />
      {showDetails && <View>
        {products.map(({ item, qty }) => {
          return <CartItem key={item.id} qty={qty} amount={qty * item.price} title={item.title} onRemove={() => {
          }} />
        })}
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: .26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  }
});

export default OrderItem;
