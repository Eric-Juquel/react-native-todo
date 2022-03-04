import React from 'react';
import {HStack} from 'native-base';
import {Status, Task} from '../../redux/features/tasksSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import HideActionButton from '../buttons/HideActionButton';

interface Props {
  task: Task;
  rowOpen: string | null;
}

const existingStatus: Status[] = ['To Do', 'In Progress', 'Done'];

const TaskStatusAction: React.FC<Props> = ({task, rowOpen}) => {
  const buttonStatus = existingStatus.filter(
    (status: string) => task.status !== status,
  );

  const dispatch = useDispatch<AppDispatch>();

  const updateStatusHandler = (index: number) => {
    console.log(index);
  };

  return (
    <HStack>
      {buttonStatus.map((el: Status, index: number) => (
        <HideActionButton
          key={index}
          type={el}
          onPress={() => updateStatusHandler(index)}
          rowOpen={rowOpen}
          itemId={task.id}
          iconName={'flag'}
          side={'left'}
          index={index}
        />
      ))}
    </HStack>
  );
};

export default TaskStatusAction;
