import {Fab} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskButton: React.FC<Props> = ({setAddModal}) => {
  return (
    <Fab
      renderInPortal={false}
      shadow={2}
      bottom={'auto'}
      size="sm"
      bg={'blueGray.500'}
      icon={<Icon color="white" name="plus" size={26} />}
      onPress={() => setAddModal(true)}
    />
  );
};

export default AddTaskButton;
