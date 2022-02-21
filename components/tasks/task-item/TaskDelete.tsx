import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {HStack, Pressable, Text, VStack} from 'native-base';
import {Task} from '../../../redux/reducers/task-reducer';
import {deleteTask} from '../../../redux/actions/task-actions';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';

interface Props {
  task: Task;
}

const TaskDelete: React.FC<Props> = ({task}) => {
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
    <HStack flex="1" pl="2" py="4">
      <Pressable
        ml="auto"
        rounded="xl"
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={confirmDeleteHandler}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon name="trash" size={22} color="white" />
          {/* <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" /> */}
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
};

export default memo(TaskDelete);
