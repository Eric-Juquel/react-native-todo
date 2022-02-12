import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>To Do App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    padding: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Header;
