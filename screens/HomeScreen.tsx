import React, {useState} from 'react';
import TaskList from '../components/layout/TasksList';
import AddTaskForm, {DefaultValues} from '../components/tasks/AddTaskForm';
import Header from '../components/layout/Header';
import {Box} from 'native-base';

const HomeScreen = () => {
  const [addModal, setAddModal] = useState<boolean>(false);

  const defaultValues: Omit<DefaultValues, 'id'> = {
    status: 'To Do',
    date: new Date(),
    title: '',
    description: '',
    deadLine: new Date(),
    priority: 'Low',
  };

  return (
    <Box bg="light.200" flex={1}>
      <Header setAddModal={setAddModal} />
      <TaskList />
      <AddTaskForm
        visible={addModal}
        setVisible={setAddModal}
        action="create"
        defaultValues={defaultValues}
      />
    </Box>
  );
};

export default HomeScreen;
