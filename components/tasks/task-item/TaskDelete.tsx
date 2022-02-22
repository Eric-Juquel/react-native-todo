import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Center,
  HStack,
  PresenceTransition,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {Task} from '../../../redux/reducers/task-reducer';
import {deleteTask} from '../../../redux/actions/task-actions';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';

interface Props {
  task: Task;
  rowOpen: string | null;
}

const TaskDelete: React.FC<Props> = ({task, rowOpen}) => {
  const dispatch = useDispatch();

  function deleteHandler() {
    dispatch(deleteTask(task));
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
    <HStack flex="1" pl="2" py="3" ml="auto">
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
    </HStack>
  );
};

export default memo(TaskDelete);
