import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import TaskItem from './TaskItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {loadTasks} from '../../redux/actions/task-actions';
import {Task} from '../../redux/reducers/task-reducer';
import colors from '../../lib/colors';
import Navigation from './Navigation';

const TaskList = () => {
  const dispatch = useDispatch();
  const {tasks} = useSelector<RootState, any>(state => state.tasksState);

  const {filter} = useSelector<RootState, any>(state => state.filterState);

  useEffect(() => {
    dispatch(loadTasks(filter));
  }, [dispatch, filter]);

  const renderTask = ({item}: {item: Task}) => <TaskItem task={item} />;

  return (
    <View style={styles.taskList}>
      <View>
        <Navigation />
      </View>
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
    height: '90%',
  },
  titleContainer: {
    height: 60,
    width: 300,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundTitle,
    borderRadius: 5,
    marginBottom: 15,
  },
  tasksTitle: {
    fontSize: 17,
  },
});
