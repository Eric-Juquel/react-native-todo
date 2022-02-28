import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {setFilter} from '../../redux/features/filterSlice';
import {Button, HStack} from 'native-base';

const Navigation = () => {
  const dispatch = useDispatch();

  const {filter} = useSelector<RootState, any>(state => state.filter);
  return (
    <HStack width={350} justifyContent={'space-between'} mt={2}>
      <Button
        variant={filter === null ? 'solid' : 'outline'}
        colorScheme="blueGray"
        style={styles.button}
        onPress={() => dispatch(setFilter(null))}>
        All
      </Button>

      <Button
        variant={filter === false ? 'solid' : 'outline'}
        colorScheme="blueGray"
        style={styles.button}
        onPress={() => dispatch(setFilter(false))}>
        Active
      </Button>

      <Button
        variant={filter === true ? 'solid' : 'outline'}
        colorScheme="blueGray"
        style={styles.button}
        onPress={() => dispatch(setFilter(true))}>
        Completed
      </Button>
    </HStack>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  button: {
    width: 100,
  },
});
