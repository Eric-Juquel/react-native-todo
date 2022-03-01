import React from 'react';
import {
  Center,
  HStack,
  PresenceTransition,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {Status, Task} from '../../redux/features/tasksSlice';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import {AppDispatch} from '../../redux/store';
import {taskCancelled} from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';

interface Props {
  task: Task;
  rowOpen: string | null;
}

const existingStatus: Task['status'] = ['To Do', 'In Progress', 'Done'];

const TaskStatusAction: React.FC<Props> = ({task, rowOpen}) => {
  const buttonStatus = existingStatus.filter(
    (status: string) => task.status !== status,
  );

  console.log('button', buttonStatus);
  const dispatch = useDispatch<AppDispatch>();

  const updateStatusHandler = () => {
    console.log(task.status);
  };

  return (
    <HStack>
      {buttonStatus.map((el: string, index: number) => (
        <PresenceTransition
          key={index}
          visible={rowOpen === task.id.toString()}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: index === 0 ? 100 : 200,
            },
          }}>
          <Center
            flex="1"
            rounded="xl"
            w="70"
            bg={
              el === 'To Do'
                ? 'primary.400'
                : el === 'Done'
                ? 'teal.400'
                : 'amber.400'
            }
            mr={2}>
            <Pressable
              cursor="pointer"
              onPress={updateStatusHandler}
              _pressed={{
                opacity: 0.5,
              }}>
              <VStack alignItems="center" space={2}>
                <Icon name="flag" size={22} color="white" />
                <Text color="white" fontSize="xs" fontWeight="medium">
                  {el}
                </Text>
              </VStack>
            </Pressable>
          </Center>
        </PresenceTransition>
      ))}
    </HStack>
  );
};

export default TaskStatusAction;
