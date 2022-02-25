import {Box, HStack, Image, Pressable, Text, VStack, ZStack} from 'native-base';
import React from 'react';
import {Task} from '../../../redux/reducers/task-reducer';

interface Props {
  item: Task;
  completed: boolean;
  updateCompleted(): void;
}

const NBTaskItem: React.FC<Props> = ({item, completed, updateCompleted}) => {
  return (
    <ZStack width={350} height={100} marginY={2}>
      <Box
        bg={
          completed
            ? {
                linearGradient: {
                  colors: ['teal.600', 'teal.300'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }
            : {
                linearGradient: {
                  colors: ['primary.600', 'lightBlue.300'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }
        }
        width="100%"
        py="4"
        px="3"
        rounded="md"
        maxWidth="100%">
        <HStack justifyContent="space-between">
          <Box justifyContent="space-between">
            <VStack>
              <Text fontSize="sm" color="white">
                {item.date.split('T')[0]}
              </Text>
              <Text color="white" fontSize="19">
                {item.title}
              </Text>
            </VStack>
          </Box>
          <Image
            bg="white"
            source={{
              uri: 'https://picsum.photos/200',
            }}
            alt="Lorem Picsum"
            height="70"
            rounded="full"
            width="70"
          />
        </HStack>
      </Box>
      <Pressable
        shadow={5}
        mt={78}
        ml={8}
        rounded="xs"
        bg={completed ? 'teal.400' : 'primary.400'}
        _pressed={{bg: completed ? 'teal.700' : 'primary.700'}}
        alignSelf="flex-start"
        py="1"
        px="3"
        onPress={updateCompleted}>
        <Text
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="white">
          {completed ? 'Done' : 'To Do'}
        </Text>
      </Pressable>
    </ZStack>
  );
};

export default NBTaskItem;
