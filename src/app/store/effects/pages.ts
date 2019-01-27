import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { ActionTypes, LoadedPages } from '../actions/pages';
import { ErrorAction } from '../actions';
import { AppDataService } from '../../services/app-data.service';
import { of } from 'rxjs';

@Injectable()
export class PagesEffects {
  constructor(private actions: Actions, private wpService: AppDataService) {}

  @Effect()
  pages = this.actions.pipe(
    ofType(ActionTypes.LoadPages),
    switchMap(() => this.wpService.loadPages()),
    map(pages => new LoadedPages(pages)),
    catchError(e => of(new ErrorAction('Pages failed to load correctly.'))));
}
