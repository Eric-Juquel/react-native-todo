import {SetFilter} from '../actions/filter-actions';
import {SET_FILTER} from '../constants';

interface FilterState {
  filter: boolean | null;
}

const initialState: FilterState = {
  filter: null,
};

export const setFilterReducer = (
  state: FilterState = initialState,
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
