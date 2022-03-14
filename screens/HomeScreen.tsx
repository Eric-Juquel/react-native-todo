import React, {useState} from 'react';
import TaskList from '../components/layout/TasksList';
import AddTaskForm, {FormData} from '../components/tasks/AddTaskForm';
import Header from '../components/layout/Header';
import {Box} from 'native-base';

const HomeScreen = () => {
  const [addModal, setAddModal] = useState<boolean>(false);

  const defaultValues: FormData = {
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
        id={undefined}
        defaultValues={defaultValues}
      />
    </Box>
  );
};

export default HomeScreen;
