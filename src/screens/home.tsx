import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/core';

export const HomeScreen: React.FC = () => {
  const { navigate } = useNavigation();

  return <View style={styles.page}></View>;
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
