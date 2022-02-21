import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {loadTasks} from '../../redux/actions/task-actions';

import colors from '../../lib/colors';
import Navigation from './Navigation';
import NBSwipeList from './NBSwipeList';

const TaskList = () => {
  const dispatch = useDispatch();
  const {tasks, success} = useSelector<RootState, any>(
    state => state.tasksState,
  );

  console.log('success', success);

  const {filter} = useSelector<RootState, any>(state => state.filterState);

  useEffect(() => {
    dispatch(loadTasks(filter));
  }, [dispatch, filter, success]);

  return (
    <View style={styles.taskList}>
      <View>
        <Navigation />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.tasksTitle}>Your Tasks</Text>
      </View>
      <NBSwipeList tasks={tasks} />
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
    width: 350,
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
