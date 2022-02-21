import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTaskDetails,
  loadTasks,
  updateTask,
} from '../../../redux/actions/task-actions';
import {RootState} from '../../../redux/store';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {Task} from '../../../redux/reducers/task-reducer';
import NBTaskItem from './NBTaskItem';

type DetailscreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface Props {
  task: {
    id: number;
    title: string;
    description: string;
    date: string;
    completed: boolean;
  };
  index: number;
}

const TaskItem: React.FC<Props> = ({task}) => {
  const navigation = useNavigation<DetailscreenNavigationProp>();
  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(task.completed);

  const {filter} = useSelector<RootState, any>(state => state.filterState);

  const {success} = useSelector<RootState, any>(state => state.tasksState);

  function updateCompletedHandler() {
    const updatedTask = {...task, completed: !isCompleted};
    dispatch(updateTask(updatedTask));
    setIsCompleted(() => !isCompleted);
  }

  function showTaskDetails(taskId: Task['id']) {
    dispatch(getTaskDetails(taskId));
    navigation.navigate('Details');
  }

  useEffect(() => {
    if (success) {
      dispatch(loadTasks(filter));
    }
  }, [dispatch, success, filter]);

  return (
    <TouchableOpacity onPress={() => showTaskDetails(task.id)}>
      <NBTaskItem
        item={task}
        completed={isCompleted}
        updateCompleted={updateCompletedHandler}
      />
    </TouchableOpacity>
  );
};

export default memo(TaskItem);
