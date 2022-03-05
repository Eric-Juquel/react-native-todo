import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {loadTasks} from '../../redux/services/taksServices';
import Navigation from './Navigation';
import TasksSwipeList from '../tasks/TasksSwipeList';
import {Box, Center, Heading} from 'native-base';

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {tasks, completedTasks, activeTasks, success} = useSelector(
    (state: RootState) => state.tasks,
  );

  console.log('taskList render');

  const {filter} = useSelector<RootState, any>(state => state.filter);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch, success]);

  console.log(tasks, success);

  return (
    <Center flex={1}>
      <Box>
        <Navigation />
      </Box>
      <Center height={60} width={350} my="2" bg="warning.300" rounded="md">
        <Heading fontWeight={300}>
          {filter === null
            ? 'All Tasks'
            : filter === true
            ? 'Completed Tasks'
            : 'Active Tasks'}
        </Heading>
      </Center>
      <TasksSwipeList
        tasks={
          filter === null
            ? tasks
            : filter === true
            ? completedTasks
            : activeTasks
        }
      />
    </Center>
  );
};

export default TaskList;
