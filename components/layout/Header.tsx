import {Center, Heading} from 'native-base';
import React from 'react';

const Header = () => {
  return (
    <Center
      bg="indigo.100"
      _text={{
        color: 'white',
      }}
      height={70}>
      <Heading size="lg" fontWeight={300}>
        To Do App
      </Heading>
    </Center>
  );
};

export default Header;
