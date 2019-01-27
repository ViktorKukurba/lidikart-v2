import { Action } from '@ngrx/store';
import { WpPage } from '../../interfaces/wp-page';

export enum ActionTypes {
  LoadedPages = '[WP] loaded pages successfully',
  LoadPages = '[WP] load pages request'
}

export class LoadedPages implements Action {
  readonly type = ActionTypes.LoadedPages;

  constructor(public payload: WpPage[]) {}
}

export class LoadPages implements Action {
  readonly type = ActionTypes.LoadPages;
}

export type ActionsPage = LoadedPages | LoadPages;
