import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Button, Center} from 'native-base';
import AddTaskForm, {FormData} from '../components/tasks/AddTaskForm';
import TaskDetails from '../components/tasks/details/TaskDetails';

const TaskDetailScreen = () => {
  const {task} = useSelector((state: RootState) => state.tasks);

  const [addModal, setAddModal] = useState<boolean>(false);

  const defaultValues: FormData = {
    title: task!.title,
    description: task!.description,
    deadLine: new Date(task!.deadLine),
    priority: task!.priority,
  };

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
            id={task.id}
            defaultValues={defaultValues}
            date={task.date}
            status={task.status}
          />
        )}
      </Center>
    )
  );
};

export default TaskDetailScreen;
