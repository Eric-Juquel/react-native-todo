import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {addTask, loadTasks} from '../../redux/actions/task-actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTask: React.FC<Props> = ({visible, setVisible}) => {
  const dispatch = useDispatch();

  const {filter} = useSelector<RootState, any>(state => state.filterState);

  const [enteredTask, setEnteredTask] = useState('');

  function taskInputHandler(enteredText: string) {
    setEnteredTask(enteredText);
  }

  function cancelAddTaskHandler() {
    setVisible(false);
  }

  function addTaskHandler() {
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
    dispatch(loadTasks(filter));
    setEnteredTask('');
    setVisible(false);
  }

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter a Task"
            style={styles.taskInput}
            onChangeText={taskInputHandler}
            value={enteredTask}
          />
          <View style={styles.buttonGrp}>
            <View style={styles.button}>
              <Button
                title="Cancel"
                color="orangered"
                onPress={cancelAddTaskHandler}
              />
            </View>
            <View style={styles.button}>
              <Button title="Add Task" onPress={addTaskHandler} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskInput: {
    width: 300,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonGrp: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 100,
  },
});
