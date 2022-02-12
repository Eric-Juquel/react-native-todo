import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTask, loadTasks} from '../../redux/task-actions';

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

  const deleteHandler = () => {
    dispatch(deleteTask(task));
    dispatch(loadTasks());
  };

  return (
    <View style={styles.card}>
      <View style={styles.task}>
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <Pressable onPress={deleteHandler}>
        <Text>X</Text>
      </Pressable>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'whitesmoke',
    padding: 15,
    marginVertical: 5,
    width: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'gray',
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
});
