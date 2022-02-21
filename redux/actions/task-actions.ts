import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../store';
import {Task} from '../reducers/task-reducer';
import {
  TASKS_ACTION_REQUEST,
  LOAD_TASKS_SUCCESS,
  CREATE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  TASKS_ACTION_FAIL,
  RESET_STATE_ACTION,
} from '../constants';

// Request acions
export interface RequestAction extends Action<typeof TASKS_ACTION_REQUEST> {}

// Fail actions
export interface FailAction extends Action<typeof TASKS_ACTION_FAIL> {
  payload: string;
}

// Reset success and error
export interface ResetStateAction extends Action<typeof RESET_STATE_ACTION> {}

// Load Tasks
export interface LoadSuccessAction extends Action<typeof LOAD_TASKS_SUCCESS> {
  payload: Task[];
}

export const loadTasks =
  (
    filter: boolean | null,
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    RequestAction | LoadSuccessAction | FailAction
  > =>
  async dispatch => {
    dispatch({
      type: TASKS_ACTION_REQUEST,
    });

    let link = 'http://localhost:3001/tasks';

    if (filter !== null) {
      link = link.concat(`?completed=${filter}`);
    }

    try {
      const response = await fetch(link);
      const tasks: Task[] = await response.json();

      dispatch({
        type: LOAD_TASKS_SUCCESS,
        payload: tasks.reverse(),
      });
    } catch (error) {
      dispatch({
        type: TASKS_ACTION_FAIL,
        payload: 'Failed to fetch tasks',
      });
    }
  };

// addTask
export interface AddSuccessAction extends Action<typeof CREATE_TASK_SUCCESS> {
  payload: {task: Task};
}

export const addTask =
  (
    task: Omit<Task, 'id'>,
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    RequestAction | AddSuccessAction | FailAction
  > =>
  async dispatch => {
    dispatch({type: TASKS_ACTION_REQUEST});

    try {
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const createdTask = await response.json();

      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: {
          task: createdTask,
        },
      });
    } catch (error) {
      dispatch({
        type: TASKS_ACTION_FAIL,
        payload: 'Failed to create task.',
      });
    }
  };

// Delete Task
export interface DeleteSuccessAction
  extends Action<typeof DELETE_TASK_SUCCESS> {
  payload: {success: boolean; task: Task};
}

export const deleteTask =
  (
    task: Task,
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    RequestAction | DeleteSuccessAction | FailAction | ResetStateAction
  > =>
  async dispatch => {
    dispatch({type: TASKS_ACTION_REQUEST});

    try {
      const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch({
          type: DELETE_TASK_SUCCESS,
          payload: {
            success: true,
            task,
          },
        });
        dispatch({type: RESET_STATE_ACTION});
      }
    } catch (error) {
      dispatch({
        type: TASKS_ACTION_FAIL,
        payload: 'Failed to delete task',
      });
    }
  };

// Get Task details
export interface DetailsSuccessAction extends Action<typeof GET_TASK_SUCCESS> {
  payload: Task;
}

export const getTaskDetails =
  (
    taskId: Task['id'],
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    RequestAction | DetailsSuccessAction | FailAction
  > =>
  async dispatch => {
    dispatch({type: TASKS_ACTION_REQUEST});

    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
      const task = await response.json();

      dispatch({
        type: GET_TASK_SUCCESS,
        payload: task,
      });
    } catch (error) {
      dispatch({
        type: TASKS_ACTION_FAIL,
        payload: 'fetch task details failed.',
      });
    }
  };

// Update Task
export interface UpdateSuccessAction
  extends Action<typeof UPDATE_TASK_SUCCESS> {
  payload: {success: boolean; task: Task};
}

export const updateTask =
  (
    task: Task,
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    RequestAction | UpdateSuccessAction | FailAction | ResetStateAction
  > =>
  async dispatch => {
    dispatch({type: TASKS_ACTION_REQUEST});

    try {
      const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const updatedTask = await response.json();

      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: {
          success: true,
          task: updatedTask,
        },
      });
      dispatch({type: RESET_STATE_ACTION});
    } catch (error) {
      dispatch({
        type: TASKS_ACTION_FAIL,
        payload: 'Failed to update task',
      });
    }
  };
