import React from 'react';
import {resetState, Task} from '../../../redux/features/tasksSlice';
import {
  Badge,
  HStack,
  IconButton,
  Pressable,
  Stagger,
  useDisclose,
} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {updateTask} from '../../../redux/services/taksServices';

interface Props {
  task: Task;
}

const Flag: React.FC<Props> = ({task}) => {
  const dispatch = useDispatch();

  const {isOpen, onToggle} = useDisclose();

  function onLow() {
    const updatedTask = {...task, priority: 'Low'};
    dispatch(updateTask(updatedTask));
    dispatch(resetState());
    onToggle();
  }
  function onMedium() {
    const updatedTask = {...task, priority: 'Medium'};
    dispatch(updateTask(updatedTask));
    dispatch(resetState());
    onToggle();
  }
  function onHigh() {
    const updatedTask = {...task, priority: 'High'};
    dispatch(updateTask(updatedTask));
    dispatch(resetState());
    onToggle();
  }

  return (
    <HStack
      w="50%"
      mt={53}
      h={10}
      justifyContent="space-around"
      alignItems="center">
      <HStack w="50%" justifyContent="space-between">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          <IconButton
            shadow={5}
            mt="2"
            variant="solid"
            bg="teal.200"
            colorScheme="teal"
            borderRadius="full"
            onPress={onLow}
            icon={
              <Icon
                size={6}
                name="flag"
                color="white"
                // _dark={{
                //   color: 'white',
                // }}
              />
            }
          />
          <IconButton
            shadow={5}
            mt="2"
            variant="solid"
            bg="amber.200"
            colorScheme="amber"
            borderRadius="full"
            onPress={onMedium}
            icon={
              <Icon
                // _dark={{
                //   color: 'white',
                // }}
                size={6}
                name="flag"
                color="white"
              />
            }
          />
          <IconButton
            shadow={5}
            mt="2"
            variant="solid"
            bg="red.200"
            colorScheme="red"
            borderRadius="full"
            onPress={onHigh}
            icon={
              <Icon
                // _dark={{
                //   color: 'white',
                // }}
                size={6}
                name="flag"
                color="white"
              />
            }
          />
        </Stagger>
      </HStack>
      <Pressable onPress={onToggle}>
        <Badge
          shadow={5}
          mt="2"
          w={16}
          variant="key"
          borderRadius="full"
          color="dark"
          bg={
            task.priority === 'Low'
              ? 'teal.200'
              : task.priority === 'Medium'
              ? 'amber.200'
              : 'red.200'
          }>
          {task.priority}
        </Badge>
      </Pressable>
    </HStack>
  );
};

export default Flag;
