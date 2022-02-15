import {
  AddFailAction,
  AddRequestAction,
  AddSuccessAction,
  DeleteFailAction,
  DeleteRequestAction,
  DeleteSuccessAction,
  DetailsFailAction,
  DetailsRequestAction,
  DetailsSuccessAction,
  LoadFailAction,
  LoadRequestAction,
  LoadSuccessAction,
  ResetDeleteAction,
  ResetUpdateAction,
  SetFilter,
  UpdateFailAction,
  UpdateRequestAction,
  UpdateSuccessAction,
} from './task-actions';
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
  RESET_DELETE_ACTION,
  RESET_UPDATE_ACTION,
  SET_FILTER,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from './tasksConstants';

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

interface FilterState {
  filter: boolean | null;
}

const initialFilter: FilterState = {
  filter: null,
};

const initialState: TasksState = {
  tasks: [],
  task: null,
  loading: false,
  success: false,
  error: null,
};

export const loadTasksReducer = (
  state: TasksState = initialState,
  action: LoadRequestAction | LoadSuccessAction | LoadFailAction,
): TasksState => {
  switch (action.type) {
    case LOAD_TASKS_REQUEST:
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
    case LOAD_TASKS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addTaskReducer = (
  state: TasksState = initialState,
  action: AddRequestAction | AddSuccessAction | AddFailAction,
) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        task: action.payload.task,
      };
    case CREATE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteTaskReducer = (
  state: TasksState = initialState,
  action:
    | DeleteRequestAction
    | DeleteSuccessAction
    | DeleteFailAction
    | ResetDeleteAction,
) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        task: action.payload.task,
      };
    case DELETE_TASK_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_DELETE_ACTION:
      return {
        ...state,
        success: false,
        error: false,
      };
    default:
      return state;
  }
};

export const getTaskDetailsReducer = (
  state: TasksState = initialState,
  action: DetailsRequestAction | DetailsSuccessAction | DetailsFailAction,
) => {
  switch (action.type) {
    case GET_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    case GET_TASK_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatetaskReducer = (
  state: TasksState = initialState,
  action:
    | UpdateRequestAction
    | UpdateSuccessAction
    | UpdateFailAction
    | ResetUpdateAction,
) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        task: action.payload.task,
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_UPDATE_ACTION:
      return {
        ...state,
        success: false,
        error: false,
      };
    default:
      return state;
  }
};

export const setFilterReducer = (
  state: FilterState = initialFilter,
  action: SetFilter,
) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        filter: action.payload,
      };
    default:
      return state;
  }
};
