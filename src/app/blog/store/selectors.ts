import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogsState } from './reducers';



export const selectBlogState: MemoizedSelector<
  object,
  BlogsState
> = createFeatureSelector<BlogsState>('blogFeature');


export const selectBlogPosts = createSelector(
  selectBlogState,
  (state: BlogsState) => {
    return state.list;
  });

  export const selectBlogPost = createSelector(
    selectBlogPosts,
    (blogs: any[], id) => blogs.find(b => b.id === id));

