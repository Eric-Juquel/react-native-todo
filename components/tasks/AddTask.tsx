import {Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {addTask, loadTasks} from '../../redux/task-actions';
import {useDispatch} from 'react-redux';

const AddTask = () => {
  const dispatch = useDispatch();
  const [enteredTask, setEnteredTask] = useState('');

  const taskInputHandler = (enteredText: string) => {
    setEnteredTask(enteredText);
  };

  const addTaskHandler = () => {
    if (enteredTask === '') {
      return;
    }
    const newTask = {
      title: enteredTask,
      description: 'Some New Description',
      date: new Date().toISOString(),
      completed: false,
    };
    dispatch(addTask(newTask));
    dispatch(loadTasks());
    setEnteredTask('');
  };

  return (
    <View>
      <TextInput
        placeholder="Enter a Task"
        style={styles.taskInput}
        onChangeText={taskInputHandler}
        value={enteredTask}
      />
      <Button title="Add Task" onPress={addTaskHandler} />
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  taskInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
