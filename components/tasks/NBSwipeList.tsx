import React from 'react';
import {Task} from '../../redux/reducers/task-reducer';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Box} from 'native-base';
import TaskItem from './task-item/TaskItem';
import TaskDelete from './task-item/TaskDelete';
import {deleteTask} from '../../redux/actions/task-actions';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';

interface Props {
  tasks: Task[];
}

const NBSwipeList: React.FC<Props> = ({tasks}) => {
  const dispatch = useDispatch();

  const renderItem = ({item, index}: {item: Task; index: number}) => (
    <TaskItem task={item} index={index} />
  );

  const renderHiddenItem = (data: any, rowMap) => {
    console.log(data, rowMap);
    return <TaskDelete deleteItem={confirmDeleteHandler} />;
  };

  const keyExtractor = (item: Task) => item.id.toString();

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  function deleteHandler() {
    // dispatch(deleteTask(task));
    console.log('delete');
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
    <Box flex={1}>
      <SwipeListView
        data={tasks}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={keyExtractor}
        rightOpenValue={-130}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
};

export default NBSwipeList;
