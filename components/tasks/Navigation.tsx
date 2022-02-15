import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {setFilter} from '../../redux/task-actions';

const Navigation = () => {
  const dispatch = useDispatch();

  const {filter} = useSelector<RootState, any>(state => state.setFilter);
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(setFilter(null))}>
        <Text style={filter === null ? styles.active : styles.text}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(setFilter(false))}>
        <Text style={filter === false ? styles.active : styles.text}>
          Active
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(setFilter(true))}>
        <Text style={filter === true ? styles.active : styles.text}>
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
