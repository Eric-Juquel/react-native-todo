import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Button, Center} from 'native-base';
import AddTaskForm, {DefaultValues} from '../components/tasks/AddTaskForm';
import TaskDetails from '../components/tasks/details/TaskDetails';

const TaskDetailScreen = () => {
  const {task} = useSelector((state: RootState) => state.tasks);

  const [defaultValues, setDefaultValues] = useState<DefaultValues | undefined>(
    undefined,
  );
  const [addModal, setAddModal] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setDefaultValues(() => ({
        ...task,
        date: new Date(task.date),
        deadLine: new Date(task.deadLine),
      }));
    }
  }, [task]);

  return (
    task && (
      <Center
        flex={1}
        bg={
          task.status === 'Done'
            ? {
                linearGradient: {
                  colors: ['teal.600', 'teal.300'],
                  start: [0, 0],
                  end: [1, 1],
                },
              }
            : task.status === 'To Do'
            ? {
                linearGradient: {
                  colors: ['primary.600', 'lightBlue.300'],
                  start: [0, 0],
                  end: [1, 1],
                },
              }
            : {
                linearGradient: {
                  colors: ['amber.600', 'amber.300'],
                  start: [0, 0],
                  end: [1, 1],
                },
              }
        }>
        {addModal === false ? (
          <>
            <TaskDetails task={task} />
            <Button
              shadow={3}
              mt={20}
              bgColor="blueGray.500"
              onPress={() => setAddModal(true)}>
              UPDATE
            </Button>
          </>
        ) : (
          <AddTaskForm
            visible={addModal}
            setVisible={setAddModal}
            action="update"
            defaultValues={defaultValues}
          />
        )}
      </Center>
    )
  );
};

export default TaskDetailScreen;
