import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import {
  addTask,
  deleteTask,
  getTaskDetails,
  loadTasks,
  updateTask,
} from '../services/taksServices';

export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  image: string;
  deadLine: string;
}

export interface TasksState {
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //Load Tasks
    builder.addCase(loadTasks.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      loadTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      },
    );
    builder.addCase(loadTasks.rejected, state => {
      state.loading = false;
      state.error = 'Error fetching tasks data.';
    });

    //Add Task
    builder.addCase(addTask.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      addTask.fulfilled,
      (state, action: PayloadAction<WritableDraft<Task>>) => {
        state.loading = false;
        state.tasks = [action.payload, ...state.tasks];
      },
    );
    builder.addCase(addTask.rejected, state => {
      state.loading = false;
      state.error = 'Error creating task.';
    });

    //Delete Task
    builder.addCase(deleteTask.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      deleteTask.fulfilled,
      (state, action: PayloadAction<Task['id']>) => {
        state.loading = false;
        state.success = true;
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      },
    );
    builder.addCase(deleteTask.rejected, state => {
      state.loading = false;
      state.error = 'Error deleting task.';
    });

    //Get TAsk Details
    builder.addCase(getTaskDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getTaskDetails.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.task = action.payload;
      },
    );
    builder.addCase(getTaskDetails.rejected, state => {
      state.loading = false;
      state.error = 'Error fetching task details';
    });

    //Update Task
    builder.addCase(updateTask.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.task = action.payload;
      },
    );
    builder.addCase(updateTask.rejected, state => {
      state.loading = false;
      state.error = 'Error fetching task details';
    });
  },
});

export default tasksSlice.reducer;
