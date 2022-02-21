import React, {useCallback} from 'react';
import {Task} from '../../redux/reducers/task-reducer';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Box} from 'native-base';
import TaskItem from './task-item/TaskItem';
import TaskDelete from './task-item/TaskDelete';

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
    (data: any) => <TaskDelete task={data.item} />,
    [],
  );

  const keyExtractor = useCallback((item: Task) => item.id.toString(), []);

  const onRowDidOpen = (rowKey: string) => {
    console.log('This row opened', rowKey);
  };

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
