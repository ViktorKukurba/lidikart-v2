import { Action } from '@ngrx/store';
import { WpPost } from '../../interfaces/wp-post';

export enum ActionsTypes {
  LoadGalleryPosts = '[WP posts gallery] load request',
  LoadedGalleryPosts = '[WP posts gallery] loaded',
  SelectGalleryCategory = '[WP posts gallery] select category',
  LoadWallPaintingPosts = '[WP posts wall paintings] load request',
  LoadedWallPaintingPosts = '[WP posts wall paintings] loaded',
  LoadExhibitionPosts = '[WP posts exhibition] load request',
  LoadedExhibitionPosts = '[WP posts exhibition] loaded',
  SelectExhibitionCategory = '[WP posts exhibition] select category',
  LoadPostsFailed = '[WP posts] load failed'
}

export class LoadGalleryPosts implements Action {
  readonly type = ActionsTypes.LoadGalleryPosts;

  constructor(public payload: any[]) {}
}

export class LoadedGalleryPosts implements Action {
  readonly type = ActionsTypes.LoadedGalleryPosts;

  constructor(public payload: WpPost[]) {}
}

export class SelectGalleryCategory implements Action {
  readonly type = ActionsTypes.SelectGalleryCategory;

  constructor(public payload) {}
}

export class LoadedWallPaintingPosts implements Action {
  readonly type = ActionsTypes.LoadedWallPaintingPosts;

  constructor(public payload: WpPost[]) {}
}

export class LoadWallPaintingPosts implements Action {
  readonly type = ActionsTypes.LoadWallPaintingPosts;

  constructor(public payload: any[]) {}
}

export class LoadExhibitionPosts implements Action {
  readonly type = ActionsTypes.LoadExhibitionPosts;

  constructor(public payload: any[]) {}
}

export class LoadedExhibitionPosts implements Action {
  readonly type = ActionsTypes.LoadedExhibitionPosts;

  constructor(public payload: WpPost[]) {}
}

export class SelectExhibitionCategory implements Action {
  readonly type = ActionsTypes.SelectExhibitionCategory;

  constructor(public payload) {}
}


export type ActionsPosts = LoadGalleryPosts | LoadedGalleryPosts | SelectGalleryCategory |
  LoadedWallPaintingPosts | LoadWallPaintingPosts |
  LoadExhibitionPosts | LoadedExhibitionPosts | SelectExhibitionCategory;
