import React, {useState} from 'react';
import TaskList from '../tasks/TaskList';
import AddTask from '../tasks/AddTask';
import Header from './Header';
import {Box} from 'native-base';

const HomeScreen = () => {
  const [addModal, setAddModal] = useState<boolean>(false);
  return (
    <Box bg="black" flex={1}>
      <Header setAddModal={setAddModal} />
      <TaskList />
      <AddTask visible={addModal} setVisible={setAddModal} />
    </Box>
  );
};

export default HomeScreen;
