import React from 'react';
import { StyleSheet, View } from 'react-native';

type OwnProps = {
  otherStyles: Record<string, any>;
  children: React.ReactNode
}
const Card: Rect.FC<OwnProps> = ({ children, otherStyles }) => {
  return (
    <View style={{ ...styles.card, ...otherStyles }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: .26,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 5
  }
});

export default Card;
