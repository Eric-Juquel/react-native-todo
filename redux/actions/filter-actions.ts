import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../store';
import {SET_FILTER} from '../constants';

export interface SetFilter extends Action<typeof SET_FILTER> {
  payload: boolean | null;
}

export const setFilter =
  (
    filter: boolean | null,
  ): ThunkAction<Promise<void>, RootState, undefined, SetFilter> =>
  async dispatch => {
    dispatch({
      type: SET_FILTER,
      payload: filter,
    });
  };
