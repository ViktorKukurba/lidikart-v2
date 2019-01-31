import { createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { PagesState, pagesReducer } from './pages';
import { CategoriesState, categoriesReducer } from './categories';
import { BlogsState, blogsReducer } from './blogs';
import { WpPage } from '../../interfaces/wp-page';
import { PostsState, postsReducer } from './posts';
import { GalleryService } from '../../services/gallery.service';
import { WpPost } from '../../interfaces/wp-post';
import { WpCategory } from '../../interfaces/wp-category';
import { ErrorTypes, ErrorActions } from '../actions';
import { Injectable } from '@angular/core';
import { RouterStateSerializer, RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params, ActivatedRouteSnapshot } from '@angular/router';

export * from './pages';
export * from './categories';
export * from './blogs';
export * from './posts';

export interface AppState {
  pages: PagesState;
  categories: CategoriesState;
  blogs: BlogsState;
  posts: PostsState;
  errorList: string[];
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  pages: pagesReducer,
  categories: categoriesReducer,
  blogs: blogsReducer,
  posts: postsReducer,
  errorList: errorReducer,
  router: routerReducer
};

export function errorReducer(state = [], action: ErrorActions) {
  switch (action.type) {
    case ErrorTypes.ActionError: return [action.payload, ...state];
    case ErrorTypes.DismissError: return state.filter(e => e !== action.payload);
  }

  return state;
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  route: ActivatedRouteSnapshot;
}

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { url, root: { queryParams } } = routerState;
    const { params } = route;
    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams, route };
  }
}

const filterCategories = (page, list) => {
  if (page && list) {
    return list.filter(i => page.categories.includes(i.id));
  }
  return [];
};

const checkFormat = (post: WpPost) => (post.better_featured_image || post.format === 'video');

export const selectPages = (state: AppState) => state.pages.list
  .filter(page => page.slug !== 'production').sort((a, b) => {
    return a.menu_order - b.menu_order;
  });

export const selectCategories = (state: AppState) => state.categories.list;
export const selectGallery = (state: AppState) => state.posts.gallery;
export const selectWallPaintings = (state: AppState) => state.posts.wallPaintings;
export const selectExhibitionPosts = (state: AppState) => state.posts.exhibition;
export const pageSelector = (slug: string) => createSelector(selectPages, pages => pages.find(p => p.slug === slug));

export const selectPageBySlug = createSelector(selectPages, (pages: WpPage[], slug: String) => pages.find(p => p.slug === slug));

export const selectGalleryImages = createSelector(
  selectGallery,
  (gallery) => gallery.list.filter(post => {
    const cat = gallery.category;
    return checkFormat(post) && (!cat || post.categories.includes(cat));
  }).map(p => GalleryService.toImageItem(p)));

export const selectWallPaintingsImages = createSelector(
  selectWallPaintings,
  (wallPaintings: WpPost[]) => wallPaintings.filter(checkFormat).map(p => GalleryService.toImageItem(p)));

export const selectExhibitionImages = createSelector(
  selectExhibitionPosts,
  (exhibition) => exhibition.list.filter(post => {
    const cat = exhibition.category;
    return checkFormat(post) && (!cat || post.categories.includes(cat));
  }).map(p => GalleryService.toImageItem(p)));

export const selectBlogs = (state: AppState) => state.blogs.list;

export const selectPageCategories = (slug: string) => createSelector(pageSelector(slug), selectCategories, filterCategories);
export const selectCategoryById = createSelector(selectCategories,
  (categories: WpCategory[], id) => categories.find(c => c.id === id));

export const selectReducerState = (state: AppState) => state.router;
export const selectReducerState2 = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const selectRouterInfo = createSelector(
  selectReducerState,
  s => s ? s.state : null
);

export const selectRouteData = createSelector(
  selectRouterInfo,
  s => s && s.route ? s.route.data : {}
);
