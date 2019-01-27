import { Injectable } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { ActionTypes, LoadedCategories } from '../actions/categories';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorAction } from '../actions';

@Injectable()
export class CategoriesEffects {
  constructor(private actions: Actions, private wpService: AppDataService) {}

  @Effect()
  categories = this.actions.pipe(
    ofType(ActionTypes.LoadCategories),
    switchMap(() => this.wpService.loadCategories()),
    map(c => new LoadedCategories(c)),
    catchError(e => of(new ErrorAction('Categories failed to load correctly.'))));
}
