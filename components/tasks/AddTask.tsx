import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';
import {addTask, loadTasks} from '../../redux/actions/task-actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Modal, Button, Input, TextArea, Text} from 'native-base';
import {useForm, Controller} from 'react-hook-form';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  title: string;
  description: string;
}

const AddTask: React.FC<Props> = ({visible, setVisible}) => {
  const dispatch = useDispatch();

  const {filter} = useSelector<RootState, any>(state => state.filterState);

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  console.log('errors', errors);

  const onSubmit = (data: FormData) => {
    const newTask = {
      title: data.title,
      description: data.description,
      date: new Date().toISOString(),
      completed: false,
      image: 'https://picsum.photos/200',
    };
    dispatch(addTask(newTask));
    dispatch(loadTasks(filter));
    reset();
    setVisible(false);
  };

  function cancelAddTaskHandler() {
    setVisible(false);
  }

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <Modal.Content maxWidth="400px" mt={-260}>
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
                  h={150}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="description"
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
