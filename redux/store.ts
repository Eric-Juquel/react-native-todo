import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {tasksReducer} from './reducers/task-reducer';
import {setFilterReducer} from './reducers/filterReducer';

const rootReducer = combineReducers({
  tasksState: tasksReducer,
  filterState: setFilterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
