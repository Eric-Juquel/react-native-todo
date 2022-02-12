import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from './store';
import {Task} from './task-reducers';
import {
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_TASK_FAIL,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  LOAD_TASKS_FAIL,
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from './tasksConstants';

// Load Tasks

export interface LoadRequestAction extends Action<typeof LOAD_TASKS_REQUEST> {}
export interface LoadSuccessAction extends Action<typeof LOAD_TASKS_SUCCESS> {
  payload: Task[];
}
export interface LoadFailAction extends Action<typeof LOAD_TASKS_FAIL> {
  payload: string;
}

export const loadTasks =
  (): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    LoadRequestAction | LoadSuccessAction | LoadFailAction
  > =>
  async dispatch => {
    dispatch({
      type: LOAD_TASKS_REQUEST,
    });

    try {
      const response = await fetch('http://localhost:3001/tasks');
      const tasks: Task[] = await response.json();

      dispatch({
        type: LOAD_TASKS_SUCCESS,
        payload: tasks,
      });
    } catch (error) {
      dispatch({
        type: LOAD_TASKS_FAIL,
        payload: 'Failed to fetch tasks',
      });
    }
  };

// addTask
export interface AddRequestAction extends Action<typeof CREATE_TASK_REQUEST> {}
export interface AddSuccessAction extends Action<typeof CREATE_TASK_SUCCESS> {
  payload: {success: boolean; task: Task};
}
export interface AddFailAction extends Action<typeof CREATE_TASK_FAIL> {
  payload: string;
}

export const addTask =
  (
    task: Omit<Task, 'id'>,
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    AddRequestAction | AddSuccessAction | AddFailAction
  > =>
  async dispatch => {
    dispatch({type: CREATE_TASK_REQUEST});

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
          success: true,
          task: createdTask,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_TASK_FAIL,
        payload: 'Failed to create task.',
      });
    }
  };

// Delete Task
export interface DeleteRequestAction
  extends Action<typeof DELETE_TASK_REQUEST> {}
export interface DeleteSuccessAction
  extends Action<typeof DELETE_TASK_SUCCESS> {
  payload: {success: boolean; task: Task};
}
export interface DeleteFailAction extends Action<typeof DELETE_TASK_FAIL> {
  payload: string;
}

export const deleteTask =
  (
    task: Task,
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    DeleteRequestAction | DeleteSuccessAction | DeleteFailAction
  > =>
  async dispatch => {
    dispatch({type: DELETE_TASK_REQUEST});

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
      }
    } catch (error) {
      dispatch({
        type: DELETE_TASK_FAIL,
        payload: 'Failed to delete task',
      });
    }
  };

// Get Task details
export interface DetailsRequestAction extends Action<typeof GET_TASK_REQUEST> {}
export interface DetailsSuccessAction extends Action<typeof GET_TASK_SUCCESS> {
  payload: Task;
}
export interface DetailsFailAction extends Action<typeof GET_TASK_FAIL> {
  payload: string;
}

export const getTaskDetails =
  (
    taskId: Task['id'],
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    DetailsRequestAction | DetailsSuccessAction | DetailsFailAction
  > =>
  async dispatch => {
    dispatch({type: GET_TASK_REQUEST});

    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
      const task = await response.json();

      dispatch({
        type: GET_TASK_SUCCESS,
        payload: task,
      });
    } catch (error) {
      dispatch({
        type: GET_TASK_FAIL,
        payload: 'fetch task details failed.',
      });
    }
  };

// Update Task
export interface UpdateRequestAction
  extends Action<typeof UPDATE_TASK_REQUEST> {}
export interface UpdateSuccessAction
  extends Action<typeof UPDATE_TASK_SUCCESS> {
  payload: {success: boolean; task: Task};
}
export interface UpdateFailAction extends Action<typeof UPDATE_TASK_FAIL> {
  payload: string;
}

export const updateTask =
  (
    task: Task,
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UpdateRequestAction | UpdateSuccessAction | UpdateFailAction
  > =>
  async dispatch => {
    dispatch({type: UPDATE_TASK_REQUEST});

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
    } catch (error) {
      dispatch({
        type: UPDATE_TASK_FAIL,
        payload: 'Failed to update task',
      });
    }
  };
