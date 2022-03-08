import React from 'react';
import {Box, HStack, Progress, Text} from 'native-base';
import dayjs from 'dayjs';

interface Props {
  startDate: string;
  endDate: string;
  textColor: string;
  lineWidth: string | number;
}

const TimeProgress: React.FC<Props> = ({
  startDate,
  endDate,
  textColor,
  lineWidth,
}) => {
  const date1 = dayjs(startDate);
  const date2 = dayjs(endDate);
  const today = dayjs(new Date().toISOString());

  const daysInterval = date2.diff(date1);

  const daysToDeadLine = date2.diff(today);

  const daysPassed = daysToDeadLine < 0 ? 0 : daysInterval - daysToDeadLine;

  const timeProgress =
    daysPassed === 0 ? 100 : Math.round((daysPassed * 100) / daysInterval);

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Text fontSize="sm" color={textColor}>
        {startDate.split('T')[0]}
      </Text>
      <Box w={lineWidth}>
        <Progress
          size="xs"
          value={timeProgress}
          mx={4}
          colorScheme="blueGray"
          bg="coolGray.300"
        />
      </Box>
      <Text fontSize="sm" color={textColor}>
        {endDate.split('T')[0]}
      </Text>
    </HStack>
  );
};

export default TimeProgress;
