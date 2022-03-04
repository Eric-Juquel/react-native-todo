import React from 'react';
import {Status, Task} from '../../redux/features/tasksSlice';
import {Center, PresenceTransition, Pressable, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {GestureResponderEvent} from 'react-native';

export type TypeButton = Status | 'Delete';

interface Props {
  type: TypeButton;
  onPress: (event: GestureResponderEvent) => void;
  rowOpen: string | null;
  itemId: Task['id'];
  index: number;
  iconName: string;
  side: string;
}

const HideActionButton: React.FC<Props> = ({
  index,
  type,
  onPress,
  rowOpen,
  itemId,
  iconName,
  side,
}) => {
  return (
    <PresenceTransition
      visible={rowOpen === itemId.toString()}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: index === 0 ? 100 : 200,
        },
      }}>
      <Center
        flex="1"
        rounded="xl"
        w="70"
        bg={
          type === 'To Do'
            ? 'primary.400'
            : type === 'Done'
            ? 'teal.400'
            : type === 'In Progress'
            ? 'amber.400'
            : 'red.500'
        }
        ml={side === 'right' ? 2 : 0}
        mr={side === 'left' ? 2 : 0}>
        <Pressable
          cursor="pointer"
          onPress={onPress}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Icon name={iconName} size={22} color="white" />
            <Text color="white" fontSize="xs" fontWeight="medium">
              {type}
            </Text>
          </VStack>
        </Pressable>
      </Center>
    </PresenceTransition>
  );
};

export default HideActionButton;
