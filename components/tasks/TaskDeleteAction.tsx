import React, {memo} from 'react';
import {Center, PresenceTransition, Pressable, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {Task} from '../../redux/features/tasksSlice';
import {deleteTask} from '../../redux/services/taksServices';
import {AppDispatch} from '../../redux/store';

interface Props {
  task: Task;
  rowOpen: string | null;
}

const TaskDelete: React.FC<Props> = ({task, rowOpen}) => {
  const dispatch = useDispatch<AppDispatch>();

  function deleteHandler() {
    dispatch(deleteTask(task.id));
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
  return (
    <PresenceTransition
      visible={rowOpen === task.id.toString()}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 100,
        },
      }}>
      <Center flex="1" rounded="xl" w="70" bg="red.500">
        <Pressable
          cursor="pointer"
          onPress={confirmDeleteHandler}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Icon name="trash" size={22} color="white" />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </Center>
    </PresenceTransition>
  );
};

export default memo(TaskDelete);
