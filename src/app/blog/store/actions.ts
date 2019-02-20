import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadBlogs = '[WP blogs] load request',
  LoadedBlogs = '[WP blogs] loaded successfully',
  LoadBlogsFailed = '[WP blogs] load failed'
}

export class LoadBlogs implements Action {
  readonly type = ActionTypes.LoadBlogs;
}

export class LoadedBlogs implements Action {
  readonly type = ActionTypes.LoadedBlogs;

  constructor(public payload) {}
}

export class LoadBlogsFailed implements Action {
  readonly type = ActionTypes.LoadBlogsFailed;

  constructor(public payload) {}
}

export type ActionsBlogs = LoadBlogs | LoadedBlogs | LoadBlogsFailed;
