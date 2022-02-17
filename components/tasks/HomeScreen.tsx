import {Button} from 'react-native';
import React, {useState} from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';

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
