import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ActionTypes, LoadedBlogs } from './actions';
import { WpService } from '../../services/wp.service';
import { of } from 'rxjs';

@Injectable()
export class BlogsEffects {
  constructor(private actions: Actions, private wpService: WpService) {}

  @Effect()
  blogs = this.actions.pipe(
    ofType(ActionTypes.LoadBlogs),
    switchMap(() => this.wpService.loadBlogs()),
    map(blogs => new LoadedBlogs(blogs)),
    catchError(e => of({type: 'Error', payload: 'Blog posts failed to load correctly.'})));
}
