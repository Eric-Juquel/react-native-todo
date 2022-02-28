import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Box, Center, Divider, Heading, HStack, Stack, Text} from 'native-base';

const TaskDetailScreen = () => {
  const {task} = useSelector((state: RootState) => state.tasks);

  return (
    task && (
      <Center flex={1} bg="light.200">
        <Box
          w={80}
          h={400}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Stack p="4" space={2}>
            <Stack h={8}>
              <Heading size="md" textAlign="center">
                {task.title}
              </Heading>
            </Stack>
            <Divider my={1} />
            <Stack h={240}>
              <Text fontWeight="400">
                {task.description ? task.description : 'Add a description'}
              </Text>
            </Stack>
            <Divider my={1} />
            <HStack alignItems="center" justifyContent="space-between" h={10}>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                {task.date.split('T')[0]}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                {task.deadLine ? task.deadLine.split('T')[0] : 'Undefined'}
              </Text>
            </HStack>
          </Stack>
        </Box>
      </Center>
    )
  );
};

export default TaskDetailScreen;
