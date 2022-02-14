import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../lib/colors';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>To Do App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: colors.backgroundMid,
    marginTop: 0,
    height: 90,
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Header;
