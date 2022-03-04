import React from 'react';
import {useDispatch} from 'react-redux';
import {getTaskDetails} from '../../redux/services/taksServices';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Task} from '../../redux/features/tasksSlice';
import TaskCard from './card/TaskCard';
import {AppDispatch} from '../../redux/store';
import {Pressable} from 'native-base';

type DetailscreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface Props {
  task: Task;
  index: number;
}

const TaskItem: React.FC<Props> = ({task}) => {
  const navigation = useNavigation<DetailscreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  console.log('tasItem render', task.title);

  function showTaskDetails(taskId: Task['id']) {
    dispatch(getTaskDetails(taskId));
    navigation.navigate('Details');
  }

  return (
    <Pressable onPress={() => showTaskDetails(task.id)}>
      <TaskCard item={task} />
    </Pressable>
  );
};

export default TaskItem;
