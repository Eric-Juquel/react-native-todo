import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {
  addTaskReducer,
  deleteTaskReducer,
  getTaskDetailsReducer,
  loadTasksReducer,
  updatetaskReducer,
} from './task-reducers';

const rootReducer = combineReducers({
  loadedTasks: loadTasksReducer,
  newTask: addTaskReducer,
  deleteTask: deleteTaskReducer,
  taskDetails: getTaskDetailsReducer,
  updateTask: updatetaskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
