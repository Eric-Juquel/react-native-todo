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

interface IconButton {
  name: string;
  color: string;
}

const iconButtons: IconButton[] = [
  {
    name: 'Low',
    color: 'teal',
  },
  {
    name: 'Medium',
    color: 'amber',
  },
  {
    name: 'High',
    color: 'red',
  },
];

const Flag: React.FC<Props> = ({task}) => {
  const dispatch = useDispatch();

  const {isOpen, onToggle} = useDisclose();

  function onUpdatePriority(name: IconButton['name']) {
    const updatedTask = {...task, priority: name};
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
          {iconButtons.map((button, index) => (
            <IconButton
              key={`${button.name}_${index}`}
              shadow={5}
              mt="2"
              variant="solid"
              bg={`${button.color}.200`}
              colorScheme={button.color}
              borderRadius="full"
              onPress={() => onUpdatePriority(button.name)}
              icon={<Icon size={6} name="flag" color="white" />}
            />
          ))}
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
