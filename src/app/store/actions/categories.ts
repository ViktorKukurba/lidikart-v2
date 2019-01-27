import { Action } from '@ngrx/store';
import { WpCategory } from '../../interfaces/wp-category';

export enum ActionTypes {
  LoadCategories = '[WP categories] load',
  LoadedCategories = '[WP categories] loaded successfully'
}

export class LoadCategories implements Action {
  readonly type = ActionTypes.LoadCategories;
}

export class LoadedCategories implements Action {
  readonly type = ActionTypes.LoadedCategories;

  constructor(public payload: WpCategory[]) {}
}

export type ActionsCategories = LoadCategories | LoadedCategories;
