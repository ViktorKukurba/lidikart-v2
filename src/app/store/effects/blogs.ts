import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ActionTypes, LoadedBlogs } from '../actions/blogs';
import { AppDataService } from '../../services/app-data.service';
import { of } from 'rxjs';
import { ErrorAction } from '../actions';

@Injectable()
export class BlogsEffects {
  constructor(private actions: Actions, private wpService: AppDataService) {}

  @Effect()
  blogs = this.actions.pipe(
    ofType(ActionTypes.LoadBlogs),
    switchMap(() => this.wpService.loadBlogs()),
    map(blogs => new LoadedBlogs(blogs)),
    catchError(e => of(new ErrorAction('Blog posts failed to load correctly.'))));
}
