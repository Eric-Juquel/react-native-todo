import {Fab, Heading, HStack} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({setAddModal}) => {
  return (
    <HStack
      bg="light.200"
      height={70}
      alignItems="center"
      justifyContent="space-between">
      <Heading size="lg" fontWeight={300} color="darkText" ml={2}>
        ⚠️ Work In Progress ⚠️
      </Heading>
      <Fab
        renderInPortal={false}
        shadow={2}
        bottom={'auto'}
        size="sm"
        bg={'blueGray.500'}
        icon={<Icon color="white" name="plus" size={26} />}
        onPress={() => setAddModal(true)}
      />
    </HStack>
  );
};

export default Header;
