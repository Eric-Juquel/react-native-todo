import {createAsyncThunk} from '@reduxjs/toolkit';
import {Task} from '../features/tasksSlice';

// load Tasks
export const loadTasks = createAsyncThunk(
  'tasks/load',
  async (filter: boolean | null) => {
    let link = 'http://localhost:3001/tasks';

    if (filter !== null) {
      link = link.concat(`?completed=${filter}`);
    }

    console.log('loadTasks');

    const response = await fetch(link);
    const tasks: Task[] = await response.json();
    return tasks.reverse();
  },
);

// Add Task
export const addTask = createAsyncThunk(
  'task/create',
  async (task: Omit<Task, 'id'>) => {
    const response = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const createdTask = await response.json();
    return createdTask;
  },
);

//Delete Task
export const deleteTask = createAsyncThunk(
  'task/delete',
  async (taskId: Task['id']) => {
    await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE',
    });

    return taskId;
  },
);

//Get Task Details
export const getTaskDetails = createAsyncThunk(
  'task/details',
  async (taskId: Task['id']) => {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
    const task = await response.json();

    return task;
  },
);

//Update Task
export const updateTask = createAsyncThunk(
  'task/update',
  async (task: Task) => {
    const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const updatedTask = await response.json();

    return updatedTask;
  },
);
