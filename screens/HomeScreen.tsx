import React, {useState} from 'react';
import TaskList from '../components/layout/TasksList';
import AddTaskForm from '../components/tasks/AddTaskForm';
import Header from '../components/layout/Header';
import {Box} from 'native-base';

const HomeScreen = () => {
  const [addModal, setAddModal] = useState<boolean>(false);
  return (
    <Box bg="light.200" flex={1}>
      <Header setAddModal={setAddModal} />
      <TaskList />
      <AddTaskForm visible={addModal} setVisible={setAddModal} />
    </Box>
  );
};

export default HomeScreen;
