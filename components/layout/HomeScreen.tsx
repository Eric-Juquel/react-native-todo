import React, {useState} from 'react';
import TaskList from '../tasks/TaskList';
import AddTask from '../tasks/AddTask';
import Header from './Header';

const HomeScreen = () => {
  const [addModal, setAddModal] = useState<boolean>(false);
  return (
    <>
      <Header setAddModal={setAddModal} />
      <TaskList />
      <AddTask visible={addModal} setVisible={setAddModal} />
    </>
  );
};

export default HomeScreen;
