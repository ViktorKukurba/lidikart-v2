import { ActionsBlogs, ActionTypes } from '../actions/blogs';

export interface BlogsState {
  list: [];
  loading: Boolean;
}

const initialState: BlogsState = {
  list: [],
  loading: false
};

export function blogsReducer(state = initialState, action: ActionsBlogs) {
  switch (action.type) {
    case ActionTypes.LoadBlogs: return {
      ...state,
      loading: true
    };
    case ActionTypes.LoadedBlogs: return {
      ...state,
      loading: false,
      list: action.payload
    };
    case ActionTypes.LoadBlogsFailed: return {
      ...state,
      loading: false,
      list: []
    };
  }
  return state;
}
