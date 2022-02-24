import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {addTask, loadTasks} from '../../redux/actions/task-actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Input,
  TextArea,
  VStack,
} from 'native-base';

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

  function taskDescriptionHandler() {
    console.log('textarea');
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
      image: 'https://picsum.photos/200',
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
        <Box bg="black" flex={1} alignItems="center" pt={32}>
          <VStack w={250} h={400} justifyContent="space-evenly">
            <Input
              isFullWidth
              size={'lg'}
              variant="underlined"
              placeholder="Enter a Task"
              onChangeText={taskInputHandler}
              value={enteredTask}
            />
            <TextArea
              isFullWidth
              size={'lg'}
              h={150}
              placeholder="Enter a Description"
              onChange={taskDescriptionHandler}
              value={enteredTask}
            />
            <HStack w={250} justifyContent="space-between" mt={5}>
              <Button
                colorScheme="danger"
                variant="ghost"
                w={100}
                size="md"
                onPress={cancelAddTaskHandler}>
                Cancel
              </Button>

              <View style={styles.button}>
                <Button
                  variant="ghost"
                  w={100}
                  size="md"
                  onPress={addTaskHandler}>
                  Add Task
                </Button>
              </View>
            </HStack>
          </VStack>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  button: {
    width: 100,
  },
});
