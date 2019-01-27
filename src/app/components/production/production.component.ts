import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { WpCategory } from '../../interfaces/wp-category';
import { AppState, selectPageCategories, selectWallPaintingsImages } from '../../store/reducers';
import { LoadWallPaintingPosts } from '../../store/actions/posts';
import { LAGalleryItem } from '../../types';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
  posts: Observable<LAGalleryItem[]>;
  public albumState;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.pipe(
      select(selectPageCategories('decor')),
      filter(categories => Boolean(categories.length)))
      .subscribe((categories: WpCategory[]) => this.store.dispatch(new LoadWallPaintingPosts(categories.map(c => c.id))));

      this.posts = this.store.select(selectWallPaintingsImages);

    this.route.params.subscribe(params => {
      this.albumState = params;
    });
  }
}
