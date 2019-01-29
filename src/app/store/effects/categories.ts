import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ActionTypes, LoadedCategories } from '../actions/categories';
import { ErrorAction } from '../actions';
import { WpService } from '../../services/wp.service';

@Injectable()
export class CategoriesEffects {
  constructor(private actions: Actions, private wpService: WpService) {}

  @Effect()
  categories = this.actions.pipe(
    ofType(ActionTypes.LoadCategories),
    switchMap(() => this.wpService.loadCategories()),
    map(c => new LoadedCategories(c)),
    catchError(e => of(new ErrorAction('Categories failed to load correctly.'))));
}
