import { Action } from '@ngrx/store';

export enum ErrorTypes {
  ActionError = 'Error Action',
  DismissError = 'Dismiss Error'
}

export class ErrorAction implements Action {
  readonly type = ErrorTypes.ActionError;

  constructor(public payload: string) {}
}

export class DismissErrorAction implements Action {
  readonly type = ErrorTypes.DismissError;

  constructor(public payload: string) {}
}

export type ErrorActions = ErrorAction | DismissErrorAction;
