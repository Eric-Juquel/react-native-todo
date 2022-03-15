import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';
import {addTask, updateTask} from '../../redux/services/taksServices';
import {useDispatch} from 'react-redux';

import {Modal, Button, Input, TextArea, Text, Radio} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AppDispatch} from '../../redux/store';
import {resetState} from '../../redux/features/tasksSlice';

export interface FormData {
  title: string;
  description: string;
  deadLine: Date;
  priority: string;
}

export interface DefaultValues extends FormData {
  id?: number;
  date: Date;
  status: string;
}

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  action: 'create' | 'update';
  defaultValues: DefaultValues | undefined;
}

const AddTask: React.FC<Props> = ({
  visible,
  setVisible,
  action,
  defaultValues,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    // console.log('data', data);
    const newTask = {
      id: defaultValues!.id,
      date: defaultValues!.date.toISOString(),
      status: defaultValues!.status,
      title: data.title,
      description: data.description,
      completed: false,
      priority: data.priority,
      deadLine: data.deadLine.toISOString(),
    };
    if (action === 'create') {
      dispatch(addTask(newTask));
    } else {
      dispatch(updateTask(newTask));
      dispatch(resetState());
    }

    reset();
    setVisible(false);
  };

  function cancelAddTaskHandler() {
    reset();
    setVisible(false);
  }

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <Modal.Content w={350} maxWidth="400px" mt={-220}>
          <Modal.CloseButton />
          <Modal.Header>New Task</Modal.Header>
          <Modal.Body>
            <Text>Title</Text>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  isFullWidth
                  size={'lg'}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="title"
              rules={{required: true}}
            />
            {errors.title && (
              <Text italic color="red.500">
                Title is required.
              </Text>
            )}
            <Text>Description</Text>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <TextArea
                  isFullWidth
                  size={'lg'}
                  h={100}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="description"
            />

            <Text>Dead Line: </Text>
            <Controller
              control={control}
              render={({field}) => (
                <DateTimePicker
                  value={field.value}
                  display="compact"
                  mode="date"
                  onChange={(e: Event, dateSelected?: Date | undefined) =>
                    field.onChange(dateSelected)
                  }
                />
              )}
              name="deadLine"
            />
            <Text>Priority: </Text>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Radio.Group
                  width="100%"
                  justifyContent="space-around"
                  name="priority"
                  flexDirection="row"
                  onChange={onChange}
                  defaultValue={defaultValues?.priority}>
                  <Radio value="Low" colorScheme="teal">
                    <Text mx={2}>Low</Text>
                  </Radio>
                  <Radio value="Medium" colorScheme="amber">
                    <Text mx={2}>Medium</Text>
                  </Radio>
                  <Radio value="High" colorScheme="red">
                    <Text mx={2}>High</Text>
                  </Radio>
                </Radio.Group>
              )}
              name="priority"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={cancelAddTaskHandler}>
                Cancel
              </Button>
              <Button onPress={handleSubmit(onSubmit)}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTask;
