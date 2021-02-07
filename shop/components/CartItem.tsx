import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type OwnProps = {
  onRemove: any;
  title: string;
  qty: number;
  amount: number;
  deletable?: boolean;
};

const CartItem: React.FC<OwnProps> = ({ onRemove, title, qty, amount, deletable }) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{qty}</Text> <Text style={styles.title}>{title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.amount}>{amount}</Text>
        {deletable && <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
          <Ionicons name={Platform.OS === "android" ? 'md-trash' : 'ios-trash'} color="red" size={23} />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: "#888",
    fontSize: 16
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;
