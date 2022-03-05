import React from 'react';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {deleteTask} from '../../redux/services/taksServices';
import {Alert} from 'react-native';

const DeleteCompletedButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {completedTasks} = useSelector((state: RootState) => state.tasks);

  function deleteHandler() {
    completedTasks.map(task => dispatch(deleteTask(task.id)));
  }

  function closeHandler() {
    return;
  }

  function confirmDeletehandler() {
    Alert.alert('would you like to delete all completed tasks?', '', [
      {text: 'Yes', style: 'default', onPress: deleteHandler},
      {text: 'No', style: 'cancel', onPress: closeHandler},
    ]);
  }

  return (
    <Button
      ml={5}
      leftIcon={<Icon name="trash" />}
      colorScheme="dark"
      onPress={confirmDeletehandler}>
      Delete Completed
    </Button>
  );
};

export default DeleteCompletedButton;
