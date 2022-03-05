import React, {useCallback} from 'react';
import {Task} from '../../redux/features/tasksSlice';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Center, HStack} from 'native-base';
import TaskItem from './TaskItem';
import TaskDeleteAction from './TaskDeleteAction';
import TaskStatusAction from './TaskStatusAction';

interface Props {
  tasks: Task[];
}

const NBSwipeList: React.FC<Props> = ({tasks}) => {
  const renderItem = useCallback(
    ({item, index}: {item: Task; index: number}) => (
      <TaskItem task={item} index={index} />
    ),
    [],
  );

  const renderHiddenItem = useCallback(
    (rowData: any, rowMap: any) => (
      <HStack flex={1} justifyContent="space-between" py={4}>
        <TaskStatusAction task={rowData.item} rowMap={rowMap} />
        <TaskDeleteAction task={rowData.item} />
      </HStack>
    ),
    [],
  );

  const keyExtractor = useCallback((item: Task) => item.id.toString(), []);

  return (
    <Center flex={1}>
      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={keyExtractor}
        leftOpenValue={160}
        rightOpenValue={-80}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </Center>
  );
};

export default NBSwipeList;
