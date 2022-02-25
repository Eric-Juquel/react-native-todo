import React, {useCallback, useState} from 'react';
import {Task} from '../../redux/reducers/task-reducer';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Center} from 'native-base';
import TaskItem from './task-item/TaskItem';
import TaskDelete from './task-item/TaskDelete';

interface Props {
  tasks: Task[];
}

const NBSwipeList: React.FC<Props> = ({tasks}) => {
  const [rowOpen, setRowOpen] = useState<string | null>(null);

  const renderItem = useCallback(
    ({item, index}: {item: Task; index: number}) => (
      <TaskItem task={item} index={index} />
    ),
    [],
  );

  const renderHiddenItem = useCallback(
    (data: any) => <TaskDelete task={data.item} rowOpen={rowOpen} />,
    [rowOpen],
  );

  const keyExtractor = useCallback((item: Task) => item.id.toString(), []);

  const onRowOpen = (rowKey: string) => {
    console.log('This row opened', rowKey);
    setRowOpen(rowKey);
  };

  const onRowClose = (rowKey: string) => {
    console.log('This row closed', rowKey);
    setRowOpen(null);
  };

  return (
    <Center flex={1}>
      <SwipeListView
        data={tasks}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={keyExtractor}
        rightOpenValue={-80}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowOpen={onRowOpen}
        onRowClose={onRowClose}
      />
    </Center>
  );
};

export default NBSwipeList;
