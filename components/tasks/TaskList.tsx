import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import TaskItem from './TaskItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {loadTasks} from '../../redux/task-actions';
import {Task} from '../../redux/task-reducers';

const TaskList = () => {
  const dispatch = useDispatch();
  const {tasks} = useSelector<RootState, any>(state => state.loadedTasks);

  useEffect(() => {
    if (!tasks.length) {
      dispatch(loadTasks());
    }
  }, [dispatch, tasks.length]);

  const renderTask = ({item}: {item: Task}) => <TaskItem task={item} />;

  return (
    <View style={styles.taskList}>
      <View style={styles.titleContainer}>
        <Text style={styles.tasksTitle}>Your Tasks</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  taskList: {
    alignItems: 'center',
    height: '70%',
  },
  titleContainer: {
    height: '10%',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 5,
    marginBottom: 15,
  },
  tasksTitle: {
    fontSize: 17,
  },
});
