import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const HeaderBtn: React.FC<any> = (props) => {
  return (
    <HeaderButton title={props.title} {...props} IconComponent={Ionicons} iconSize={23} color="#f1460f" />
  );
};

export default HeaderBtn;
