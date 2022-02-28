import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface FilterState {
  filter: boolean | null;
}

const initialState: FilterState = {
  filter: null,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<boolean | null>) => {
      state.filter = action.payload;
    },
  },
});

export const {setFilter} = filterSlice.actions;

export default filterSlice.reducer;
