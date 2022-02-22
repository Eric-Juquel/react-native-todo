import {Box, HStack, Image, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {Task} from '../../../redux/reducers/task-reducer';

interface Props {
  item: Task;
  completed: boolean;
  updateCompleted(): void;
}

const NBTaskItem: React.FC<Props> = ({item, completed, updateCompleted}) => {
  return (
    <Box
      bg={completed ? 'teal.600' : 'primary.600'}
      py="4"
      px="3"
      rounded="md"
      width={350}
      height={100}
      marginY={2}
      maxWidth="100%">
      <HStack justifyContent="space-between">
        <Box justifyContent="space-between">
          <VStack space="2">
            <Text fontSize="sm" color="white">
              {item.date.split('T')[0]}
            </Text>
            <Text color="white" fontSize="xl">
              {item.title}
            </Text>
          </VStack>
          <Pressable
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
        </Box>
        <Image
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
  );
};

export default NBTaskItem;
