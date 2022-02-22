import {TouchableOpacity} from 'react-native';
import React, {useState, memo} from 'react';
import {useDispatch} from 'react-redux';
import {getTaskDetails, updateTask} from '../../../redux/actions/task-actions';
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
    image: string;
  };
  index: number;
}

const TaskItem: React.FC<Props> = ({task}) => {
  const navigation = useNavigation<DetailscreenNavigationProp>();
  const dispatch = useDispatch();

  // console.log('tasItem render', task.id);

  const [isCompleted, setIsCompleted] = useState(task.completed);

  function updateCompletedHandler() {
    const updatedTask = {...task, completed: !isCompleted};
    dispatch(updateTask(updatedTask));
    setIsCompleted(() => !isCompleted);
  }

  function showTaskDetails(taskId: Task['id']) {
    dispatch(getTaskDetails(taskId));
    navigation.navigate('Details');
  }

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
