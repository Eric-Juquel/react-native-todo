import {Box, HStack, Text, VStack, ZStack} from 'native-base';
import React from 'react';
import {Task} from '../../../redux/features/tasksSlice';
import PriorityBadge from './PriorityBadge';
import TaskStatusBtn from './TaskStatusBtn';
import TimeProgress from './TimeProgress';

interface Props {
  item: Task;
}

const NBTaskItem: React.FC<Props> = ({item}) => {
  return (
    <ZStack width={350} height={100} marginY={2}>
      <Box
        bg={
          item.status === 'Done'
            ? {
                linearGradient: {
                  colors: ['teal.600', 'teal.300'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }
            : item.status === 'To Do'
            ? {
                linearGradient: {
                  colors: ['primary.600', 'lightBlue.300'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }
            : {
                linearGradient: {
                  colors: ['amber.600', 'amber.300'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }
        }
        w={'100%'}
        h={95}
        py="2"
        px="3"
        rounded="md">
        <VStack justifyContent="space-between" h={'100%'}>
          <TimeProgress
            startDate={item.date}
            endDate={item.deadLine ? item.deadLine : item.date}
            textColor="white"
            lineWidth="50%"
          />

          <HStack h="60%">
            <Text color="white" fontSize="19">
              {item.title}
            </Text>
          </HStack>
        </VStack>
      </Box>
      <HStack justifyContent="space-between">
        <TaskStatusBtn status={item.status} />
        {!item.completed && <PriorityBadge task={item} />}
      </HStack>
    </ZStack>
  );
};

export default NBTaskItem;
