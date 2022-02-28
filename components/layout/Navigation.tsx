import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {setFilter} from '../../redux/features/filterSlice';
import {Button, HStack} from 'native-base';

const Navigation = () => {
  const dispatch = useDispatch();

  interface NavButton {
    label: string;
    action: boolean | null;
  }

  const buttons: NavButton[] = [
    {label: 'All', action: null},
    {label: 'Active', action: false},
    {label: 'Completed', action: true},
  ];

  const {filter} = useSelector<RootState, any>(state => state.filter);
  return (
    <HStack width={350} justifyContent={'space-between'} mt={2}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={filter === button.action ? 'solid' : 'outline'}
          colorScheme="blueGray"
          w={100}
          onPress={() => dispatch(setFilter(button.action))}>
          {button.label}
        </Button>
      ))}
    </HStack>
  );
};

export default Navigation;
