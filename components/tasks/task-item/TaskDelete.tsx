import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {HStack, Pressable, Text, VStack} from 'native-base';

interface Props {
  deleteItem(): void;
}

const TaskDelete: React.FC<Props> = ({deleteItem}) => {
  const trashIcon = <Icon name="trash" size={22} color="#900" />;

  return (
    // <Pressable onPress={deleteItem}>
    //   <Text>{trashIcon}</Text>
    // </Pressable>
    <HStack flex="1" pl="2" py="4">
      <Pressable
        ml="auto"
        rounded="xl"
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon name="trash" size={22} color="white" />
          {/* <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" /> */}
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
};

export default TaskDelete;
