import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ActionTypes, LoadedPages } from '../actions/pages';
import { ErrorAction } from '../actions';
import { WpService } from '../../services/wp.service';

@Injectable()
export class PagesEffects {
  constructor(private actions: Actions, private wpService: WpService) {}

  @Effect()
  pages = this.actions.pipe(
    ofType(ActionTypes.LoadPages),
    switchMap(() => this.wpService.loadPages()),
    map(pages => new LoadedPages(pages)),
    catchError(e => of(new ErrorAction('Pages failed to load correctly.'))));
}
