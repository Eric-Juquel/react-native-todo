import React, {memo} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {Task} from '../../redux/features/tasksSlice';
import {deleteTask} from '../../redux/services/taksServices';
import {AppDispatch} from '../../redux/store';
import HideActionButton from '../buttons/HideActionButton';

interface Props {
  task: Task;
}

const TaskDelete: React.FC<Props> = ({task}) => {
  const dispatch = useDispatch<AppDispatch>();

  function deleteHandler() {
    dispatch(deleteTask(task.id));
  }

  function closeHandler() {
    return;
  }

  function confirmDeleteHandler() {
    Alert.alert('would you like to delete this task ?', '', [
      {text: 'Yes', style: 'default', onPress: deleteHandler},
      {text: 'No', style: 'cancel', onPress: closeHandler},
    ]);
  }
  return (
    <HideActionButton
      key={0}
      type="Delete"
      onPress={confirmDeleteHandler}
      iconName="trash"
      side="right"
    />
  );
};

export default memo(TaskDelete);
