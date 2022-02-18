import {Pressable, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  deleteItem(): void;
}

const TaskDelete: React.FC<Props> = ({deleteItem}) => {
  const trashIcon = <Icon name="trash" size={22} color="#900" />;

  return (
    <Pressable onPress={deleteItem}>
      <Text>{trashIcon}</Text>
    </Pressable>
  );
};

export default TaskDelete;
