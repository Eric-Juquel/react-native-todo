import {
  RequestAction,
  LoadSuccessAction,
  AddSuccessAction,
  DetailsSuccessAction,
  DeleteSuccessAction,
  UpdateSuccessAction,
  ResetStateAction,
  FailAction,
} from '../actions/task-actions';
import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  LOAD_TASKS_SUCCESS,
  RESET_STATE_ACTION,
  TASKS_ACTION_FAIL,
  TASKS_ACTION_REQUEST,
  UPDATE_TASK_SUCCESS,
} from '../constants';

export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  task: Task | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  task: null,
  loading: false,
  success: false,
  error: null,
};

export const tasksReducer = (
  state: TasksState = initialState,
  action:
    | RequestAction
    | LoadSuccessAction
    | AddSuccessAction
    | DeleteSuccessAction
    | UpdateSuccessAction
    | DetailsSuccessAction
    | FailAction
    | ResetStateAction,
) => {
  switch (action.type) {
    case TASKS_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };

    case GET_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.payload,
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload.task],
      };
    case DELETE_TASK_SUCCESS:
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        task: action.payload.task,
      };

    case TASKS_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_STATE_ACTION:
      return {
        ...state,
        success: false,
        error: false,
      };

    default:
      return state;
  }
};
