import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {setFilter} from '../../redux/actions/filter-actions';

const Navigation = () => {
  const dispatch = useDispatch();

  const {filter} = useSelector<RootState, any>(state => state.filterState);
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={
          filter === null
            ? {...styles.button, ...styles.buttonActive}
            : styles.button
        }
        onPress={() => dispatch(setFilter(null))}>
        <Text
          style={
            filter === null ? {...styles.text, ...styles.active} : styles.text
          }>
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          filter === false
            ? {...styles.button, ...styles.buttonActive}
            : styles.button
        }
        onPress={() => dispatch(setFilter(false))}>
        <Text
          style={
            filter === false ? {...styles.text, ...styles.active} : styles.text
          }>
          Active
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          filter === true
            ? {...styles.button, ...styles.buttonActive}
            : styles.button
        }
        onPress={() => dispatch(setFilter(true))}>
        <Text
          style={
            filter === true ? {...styles.text, ...styles.active} : styles.text
          }>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  navContainer: {
    width: 370,
    marginTop: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 85,
    height: 25,
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '200',
    color: '#5b5b5b',
  },
  active: {
    color: 'white',
  },
});
