import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as PostsActions from '../actions/posts';
import { ErrorAction } from '../actions';
import { WpService } from '../../services/wp.service';

@Injectable()
export class PostsEffects {
  constructor(private actions: Actions, private wpService: WpService) {}

  @Effect()
  gallery = this.actions.pipe(
    ofType(PostsActions.ActionsTypes.LoadGalleryPosts),
    map((action: PostsActions.LoadGalleryPosts) => action.payload),
    switchMap(categories => this.wpService.loadPostsByCategories(categories)),
    map(posts => new PostsActions.LoadedGalleryPosts(posts)),
    catchError(e => of(new ErrorAction('Gallery images failed to load correctly.'))));

  @Effect()
  wallPaintings = this.actions.pipe(
    ofType(PostsActions.ActionsTypes.LoadWallPaintingPosts),
    map((action: PostsActions.LoadWallPaintingPosts) => action.payload),
    switchMap(categories => this.wpService.loadPostsByCategories(categories)),
    map(posts => new PostsActions.LoadedWallPaintingPosts(posts)),
    catchError(e => of(new ErrorAction('Wall paintings failed to load correctly.'))));

  @Effect()
  exhibition = this.actions.pipe(
    ofType(PostsActions.ActionsTypes.LoadExhibitionPosts),
    map((action: PostsActions.LoadExhibitionPosts) => action.payload),
    switchMap(categories => this.wpService.loadPostsByCategories(categories)),
    map(posts => new PostsActions.LoadedExhibitionPosts(posts)),
    catchError(e => of(new ErrorAction('Exhibition images failed to load correctly.'))));
}
