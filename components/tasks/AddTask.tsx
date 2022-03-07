import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';
import {addTask} from '../../redux/services/taksServices';
import {useDispatch} from 'react-redux';

import {Modal, Button, Input, TextArea, Text} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AppDispatch} from '../../redux/store';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  title: string;
  description: string;
  deadLine: Date;
}

const AddTask: React.FC<Props> = ({visible, setVisible}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      deadLine: new Date(Date.now()),
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    const newTask = {
      title: data.title,
      description: data.description,
      date: new Date().toISOString(),
      status: 'To Do',
      completed: false,
      priority: 'Low',
      deadLine: data.deadLine.toISOString(),
    };
    dispatch(addTask(newTask));
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
        <Modal.Content w={350} maxWidth="400px" mt={-260}>
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
                  onChange={(e: Event, date?: Date | undefined) =>
                    field.onChange(date)
                  }
                />
              )}
              name="deadLine"
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
