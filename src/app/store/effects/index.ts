import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ErrorTypes } from '../actions';

export * from './pages';
export * from './categories';
export * from './posts';

@Injectable()
export class ErrorEffect {
  constructor(private actions: Actions) {}
  @Effect()
  error = this.actions.pipe(ofType(ErrorTypes.ActionError));
}
