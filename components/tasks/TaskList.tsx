import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {loadTasks} from '../../redux/actions/task-actions';

import Navigation from './Navigation';
import NBSwipeList from './NBSwipeList';
import {Box, Center, Heading} from 'native-base';

const TaskList = () => {
  const dispatch = useDispatch();
  const {tasks, success} = useSelector<RootState, any>(
    state => state.tasksState,
  );

  console.log('taskList render');

  const {filter} = useSelector<RootState, any>(state => state.filterState);

  useEffect(() => {
    dispatch(loadTasks(filter));
  }, [dispatch, filter, success]);

  return (
    <Center flex={1}>
      <Box>
        <Navigation />
      </Box>
      <Center height={60} width={350} my="2" bg="warning.300" rounded="md">
        <Heading fontWeight={300}>Your Tasks</Heading>
      </Center>
      <NBSwipeList tasks={tasks} />
    </Center>
  );
};

export default TaskList;
