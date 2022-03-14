import React from 'react';
import {Box, Center, Divider, Heading, Stack, Text} from 'native-base';
import TimeProgress from '../card/TimeProgress';
import {Task} from '../../../redux/features/tasksSlice';

interface Props {
  task: Task;
}

const TaskDetails: React.FC<Props> = ({task}) => {
  return (
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
      _light={{
        borderColor: 'coolGray.200',
        borderWidth: '1',
        backgroundColor: 'gray.50',
      }}>
      <Stack p="4" space={2}>
        <Stack h={8}>
          <Heading size="md" textAlign="center">
            {task.title}
          </Heading>
        </Stack>
        <Divider my={1} />
        <Stack h={160}>
          <Text fontWeight="400">
            {task.description ? task.description : 'Add a description'}
          </Text>
        </Stack>
        <Divider my={1} />
        <Center h={16} flexDir="row">
          <Text>Priority: </Text>
          <Text
            color={
              task.priority === 'Low'
                ? 'teal.500'
                : task.priority === 'Medium'
                ? 'amber.500'
                : 'red.500'
            }>
            {' '}
            {task.priority}
          </Text>
        </Center>
        <Divider my={1} />
        <Center flexDir="row" h={8}>
          <TimeProgress
            startDate={task.date}
            endDate={task.deadLine}
            textColor="blueGray.500"
            lineWidth="40%"
          />
        </Center>
      </Stack>
    </Box>
  );
};

export default TaskDetails;
