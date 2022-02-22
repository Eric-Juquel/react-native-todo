import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const TaskDetailScreen = () => {
  const {task} = useSelector<RootState, any>(state => state.tasksState);

  return (
    <View style={styles.detailsContainer}>
      {task && (
        <>
          <View>
            <Text style={styles.title}>{task.title}</Text>
          </View>
          <View>
            <Text style={styles.description}>{task.description}</Text>
          </View>
          <View>
            <Text style={styles.date}>{task.date.split('T')[0]}</Text>
          </View>
          <View>
            <Text style={task.completed ? styles.completed : styles.todo}>
              {task.completed ? 'Done' : 'To Do'}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  description: {
    fontSize: 20,
  },
  date: {
    color: 'orangered',
  },
  completed: {
    color: 'teal',
  },
  todo: {
    color: 'blue',
  },
});
