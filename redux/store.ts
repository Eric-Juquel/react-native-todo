import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {
  addTaskReducer,
  deleteTaskReducer,
  loadTasksReducer,
} from './task-reducers';

const rootReducer = combineReducers({
  loadedTasks: loadTasksReducer,
  newTask: addTaskReducer,
  deletedTask: deleteTaskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
