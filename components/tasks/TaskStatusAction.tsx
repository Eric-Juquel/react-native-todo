import React from 'react';
import {HStack} from 'native-base';
import {resetState, Status, Task} from '../../redux/features/tasksSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import HideActionButton from '../buttons/HideActionButton';
import {updateTask} from '../../redux/services/taksServices';

interface Props {
  task: Task;
  rowMap: any;
}

const existingStatus: Status[] = ['To Do', 'In Progress', 'Done'];

const TaskStatusAction: React.FC<Props> = ({task, rowMap}) => {
  const buttonStatus = existingStatus.filter(
    (status: string) => task.status !== status,
  );

  const dispatch = useDispatch<AppDispatch>();

  const updateStatusHandler = (status: Status) => {
    let completed: boolean;
    if (status === 'Done') {
      completed = true;
    } else {
      completed = false;
    }

    console.log('status', status, 'completed', completed);
    const updatedTask = {...task, status, completed};
    dispatch(updateTask(updatedTask));
    rowMap[task.id.toString()].closeRow();
    dispatch(resetState());
  };

  return (
    <HStack>
      {buttonStatus.map((el: Status, index: number) => (
        <HideActionButton
          key={index}
          type={el}
          onPress={() => updateStatusHandler(el)}
          iconName={'flag'}
          side={'left'}
        />
      ))}
    </HStack>
  );
};

export default TaskStatusAction;
