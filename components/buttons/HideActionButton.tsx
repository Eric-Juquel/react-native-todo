import React from 'react';
import {Status} from '../../redux/features/tasksSlice';
import {Box, Center, Pressable, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {GestureResponderEvent} from 'react-native';

export type TypeButton = Status | 'Delete';

interface Props {
  type: TypeButton;
  onPress: (event: GestureResponderEvent) => void;
  index?: number;
  iconName: string;
  side: string;
}

const HideActionButton: React.FC<Props> = ({
  type,
  onPress,

  iconName,
  side,
}) => {
  return (
    <Box>
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
    </Box>
  );
};

export default HideActionButton;
