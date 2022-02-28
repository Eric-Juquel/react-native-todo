import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {loadTasks} from '../../redux/services/taksServices';

import Navigation from './Navigation';
import NBSwipeList from './NBSwipeList';
import {Box, Center, Heading} from 'native-base';

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {tasks} = useSelector((state: RootState) => state.tasks);

  // console.log('taskList render');

  const {filter} = useSelector<RootState, any>(state => state.filter);

  useEffect(() => {
    dispatch(loadTasks(filter));
  }, [dispatch, filter]);

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
      <NBSwipeList tasks={tasks} />
    </Center>
  );
};

export default TaskList;
