import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from 'native-base';

const TaskDetailScreen = () => {
  const {task} = useSelector<RootState, any>(state => state.tasksState);

  return (
    task && (
      <Center flex={1}>
        <Box
          maxW="80"
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
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: task.image,
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={5}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {task.title}
              </Heading>
            </Stack>
            <Text fontWeight="400">{task.description}</Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between">
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="400">
                  {task.date.split('T')[0]}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Center>
    )
  );
};

export default TaskDetailScreen;
