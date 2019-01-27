import { WpPage } from '../../interfaces/wp-page';
import { ActionsPage, ActionTypes } from '../actions/pages';

export interface PagesState {
  list: WpPage[];
  loading: Boolean;
}

const initialState: PagesState = {
  list: [],
  loading: false
};

export function pagesReducer(state = initialState, action: ActionsPage) {
  switch (action.type) {
    case ActionTypes.LoadPages: return {
      ...state,
      loading: true
    };
    case ActionTypes.LoadedPages: return {
      ...state,
      loading: false,
      list: action.payload
    };
  }
  return state;
}
