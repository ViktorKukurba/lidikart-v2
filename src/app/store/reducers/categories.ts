import { ActionTypes, ActionsCategories } from '../actions/categories';
import { WpCategory } from '../../interfaces/wp-category';

export interface CategoriesState {
  list: WpCategory[];
  loading: Boolean;
}

const initialState: CategoriesState = {
  list: [],
  loading: false
};

export function categoriesReducer(state = initialState, action: ActionsCategories) {
  switch (action.type) {
    case ActionTypes.LoadCategories: return {
      ...state,
      loading: true
    };

    case ActionTypes.LoadedCategories: return {
      list: action.payload,
      loading: false
    };
  }
  return state;
}

