import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../constants/Colors";

const HeaderBtn: React.FC<any> = (props) => {
  return <HeaderButton {...props} title={props.title} IconComponent={Ionicons} iconSize={23}
                       color={Platform.OS === 'ios' ? 'white' : Colors.primary} />;
};


export default HeaderBtn;
