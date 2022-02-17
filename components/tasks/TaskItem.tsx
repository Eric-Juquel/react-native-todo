import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteTask,
  getTaskDetails,
  loadTasks,
  updateTask,
} from '../../redux/actions/task-actions';
import {RootState} from '../../redux/store';
import colors from '../../lib/colors';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Task} from '../../redux/reducers/task-reducer';
import Icon from 'react-native-vector-icons/Entypo';

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
}

const TaskItem: React.FC<Props> = ({task}) => {
  const navigation = useNavigation<DetailscreenNavigationProp>();
  const dispatch = useDispatch();

  const trashIcon = <Icon name="trash" size={22} color="#900" />;

  const [isCompleted, setIsCompleted] = useState(task.completed);

  const {filter} = useSelector<RootState, any>(state => state.filterState);

  const {success} = useSelector<RootState, any>(state => state.tasksState);

  function deleteHandler() {
    dispatch(deleteTask(task));
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

  function updateCompletedHandler() {
    const updatedTask = {...task, completed: !isCompleted};
    dispatch(updateTask(updatedTask));
    setIsCompleted(() => !isCompleted);
  }

  function showTaskDetails(taskId: Task['id']) {
    console.log('id', taskId);
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
      <View style={styles.card}>
        <View>
          <BouncyCheckbox
            size={25}
            fillColor="teal"
            unfillColor="#FFFFFF"
            isChecked={isCompleted}
            disableBuiltInState
            iconStyle={isCompleted ? styles.completed : styles.pending}
            onPress={updateCompletedHandler}
          />
        </View>
        <View style={styles.task}>
          <Text style={styles.title}>{task.title}</Text>
        </View>
        <Pressable onPress={confirmDeleteHandler}>
          <Text>{trashIcon}</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding: 15,
    marginVertical: 5,
    width: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: colors.border,
    borderWidth: 0.5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  task: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  completed: {borderColor: 'teal'},
  pending: {borderColor: '#0093ff'},
  delete: {color: 'red', fontSize: 20},
});
