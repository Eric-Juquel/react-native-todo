import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../lib/colors';

const Navigation = () => {
  const [active, setActive] = useState('All');

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.button} onPress={() => setActive('All')}>
        <Text style={active === 'All' ? styles.active : styles.text}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setActive('Active')}>
        <Text style={active === 'Active' ? styles.active : styles.text}>
          Active
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setActive('Completed')}>
        <Text style={active === 'Completed' ? styles.active : styles.text}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  navContainer: {
    width: 350,
    marginTop: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {width: 80},
  text: {
    color: '#5b5b5b',
    fontSize: 15,
    fontWeight: '200',
  },
  active: {
    color: '#070707',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
