import React, {useCallback, useState} from 'react';
import {Task} from '../../redux/features/tasksSlice';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Center, HStack, Text} from 'native-base';
import TaskItem from './TaskItem';
import TaskDeleteAction from './TaskDeleteAction';

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
    (data: any) => (
      <HStack flex={1} justifyContent="space-between" py={3}>
        <Text>Actions</Text>
        <TaskDeleteAction task={data.item} rowOpen={rowOpen} />
      </HStack>
    ),
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
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={keyExtractor}
        leftOpenValue={80}
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