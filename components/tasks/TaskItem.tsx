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
import {deleteTask, loadTasks, updateTask} from '../../redux/task-actions';
import {RootState} from '../../redux/store';
import colors from '../../lib/colors';

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
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const {success} = useSelector<RootState, any>(state => state.deleteTask);

  const {success: updatedSuccess} = useSelector<RootState, any>(
    state => state.updateTask,
  );

  const deleteHandler = () => {
    dispatch(deleteTask(task));
  };

  const closeHandler = () => {
    return;
  };

  const confirmDeleteHandler = () => {
    Alert.alert('would you like to delete this task ?', '', [
      {text: 'Yes', style: 'default', onPress: deleteHandler},
      {text: 'No', style: 'cancel', onPress: closeHandler},
    ]);
  };

  const updateCompletedHandler = () => {
    const updatedTask = {...task, completed: !isCompleted};
    dispatch(updateTask(updatedTask));
    setIsCompleted(() => !isCompleted);
  };

  useEffect(() => {
    if (success || updatedSuccess) {
      dispatch(loadTasks());
    }
  }, [dispatch, success, updatedSuccess]);

  return (
    <TouchableOpacity>
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
          <Text>X</Text>
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
  pending: {borderColor: 'orangered'},
});
