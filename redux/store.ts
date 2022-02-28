import {tasksReducer} from './reducers/task-reducer';
import {setFilterReducer} from './reducers/filterReducer';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    filter: setFilterReducer,
    tasks: tasksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
