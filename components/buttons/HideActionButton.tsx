import React from 'react';
import {Status, Task} from '../../redux/features/tasksSlice';
import {Center, PresenceTransition, Pressable, Text, VStack} from 'native-base';
import {Icon} from 'react-native-vector-icons/Icon';
import {GestureResponderEvent} from 'react-native';

export type TypeButton = Status | 'Delete';

interface Props {
  type: TypeButton;
  onPress: (event: GestureResponderEvent) => void;
  rowOpen: string;
  itemId: Task['id'];
  key: number;
}

const HideActionButton: React.FC<Props> = ({
  key,
  type,
  onPress,
  rowOpen,
  itemId,
}) => {
  return (
    <PresenceTransition
      key={key}
      visible={rowOpen === itemId.toString()}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: key === 0 ? 100 : 200,
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
            : 'amber.400'
        }
        mr={2}>
        <Pressable
          cursor="pointer"
          onPress={onPress}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Icon name="flag" size={22} color="white" />
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
