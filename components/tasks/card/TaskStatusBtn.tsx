import React from 'react';
import {HStack, Pressable, Text} from 'native-base';
import {Status} from '../../../redux/features/tasksSlice';

interface Props {
  status: Status;
}

const TaskStatusBtn: React.FC<Props> = ({status}) => {
  return (
    <HStack mt={78} h={7} w={'80%'}>
      <Pressable
        shadow={5}
        ml={6}
        rounded="xs"
        bg={
          status === 'To Do'
            ? 'primary.400'
            : status === 'Done'
            ? 'teal.400'
            : 'amber.400'
        }
        _pressed={{
          bg:
            status === 'To Do'
              ? 'primary.700'
              : status === 'Done'
              ? 'teal.700'
              : 'amber.400',
        }}
        alignSelf="flex-start"
        py="1"
        px="3">
        <Text
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="white">
          {status}
        </Text>
      </Pressable>
    </HStack>
  );
};

export default TaskStatusBtn;
