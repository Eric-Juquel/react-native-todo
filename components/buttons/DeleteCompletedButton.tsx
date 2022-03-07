import React, {useRef, useState} from 'react';
import {AlertDialog, Button, Center} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {deleteTask} from '../../redux/services/taksServices';

const DeleteCompletedButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {completedTasks} = useSelector((state: RootState) => state.tasks);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef: React.MutableRefObject<null> = useRef(null);

  function deleteHandler() {
    completedTasks.map(task => dispatch(deleteTask(task.id)));
    onClose();
  }

  return (
    <Center>
      <Button
        ml={5}
        leftIcon={<Icon name="trash" color="white" />}
        colorScheme="danger"
        onPress={() => setIsOpen(!isOpen)}>
        Delete Completed
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Customer</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all tasks completed. This action cannot be
            reversed. Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={deleteHandler}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default DeleteCompletedButton;
