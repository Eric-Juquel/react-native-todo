import {Button} from 'react-native';
import React, {useState} from 'react';
import TaskList from '../tasks/TaskList';
import AddTask from '../tasks/AddTask';

const HomeScreen = () => {
  const [addModal, setAddModal] = useState(false);
  return (
    <>
      <TaskList />
      <AddTask visible={addModal} setVisible={setAddModal} />
      <Button title="Add New Task" onPress={() => setAddModal(true)} />
    </>
  );
};

export default HomeScreen;
