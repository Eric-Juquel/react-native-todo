import {HStack} from 'native-base';
import React from 'react';
import AddTaskButton from '../buttons/AddTaskButton';
import DeleteCompletedButton from '../buttons/DeleteCompletedButton';

interface Props {
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({setAddModal}) => {
  return (
    <HStack bg="light.200" height={70} alignItems="center">
      <DeleteCompletedButton />
      <AddTaskButton setAddModal={setAddModal} />
    </HStack>
  );
};

export default Header;
