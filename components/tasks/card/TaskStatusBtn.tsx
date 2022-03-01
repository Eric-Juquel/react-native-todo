import React from 'react';
import {HStack, Pressable, Text} from 'native-base';

interface Props {
  status: boolean;
  updateCompleted(): void;
}

const TaskStatusBtn: React.FC<Props> = ({status, updateCompleted}) => {
  return (
    <HStack mt={78} h={7} w={'80%'}>
      <Pressable
        shadow={5}
        ml={6}
        rounded="xs"
        bg={status === false ? 'primary.400' : 'teal.400'}
        _pressed={{
          bg: status === false ? 'primary.700' : 'teal.700',
        }}
        alignSelf="flex-start"
        py="1"
        px="3"
        onPress={updateCompleted}>
        <Text
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="white">
          {status === false ? 'To Do' : 'Done'}
        </Text>
      </Pressable>
    </HStack>
  );
};

export default TaskStatusBtn;
