import { Component, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { pageY } from '../../utils';
import { AppDataService } from '../../services/app-data.service';
import { AppSettings } from '../../constants';
import { WpCategory } from '../../interfaces/wp-category';
import { LAGalleryItem } from '../../types';
import { AppState, selectGalleryImages, selectPageCategories, selectGallery, selectCategoryById } from '../../store/reducers';
import { LoadGalleryPosts, SelectGalleryCategory } from '../../store/actions/posts';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit, OnDestroy {
  categories$: Observable<WpCategory[]>;
  pictures: Observable<LAGalleryItem[]>;
  albumState: {pic?: string} = {};
  serie$: Observable<WpCategory>;
  @ViewChild('filter')
  private navigation: ElementRef;
  private top_: number;
  private slug = AppSettings.ROUTE.GALLERY;
  private scrollHandler = (evt => {
    const nav = this.navigation.nativeElement;
    if (pageY() >= this.top_) {
      nav.classList.add('fixed');
    } else {
      nav.classList.remove('fixed');
    }
  }).bind(this);
  constructor(
    private store: Store<AppState>,
    private appService: AppDataService,
    private route: ActivatedRoute) {
      this.categories$ = this.store.pipe(
        select(selectPageCategories(this.slug)),
        map(categories => {
          return categories.filter(c => c.slug !== 'general' && !(c.slug && c.slug.includes('-no-show')));
        }));
      this.categories$.pipe(filter(categories => Boolean(categories.length))).subscribe(categories => {
        this.store.dispatch(new LoadGalleryPosts(categories.map(c => c.id)));
      });
      this.pictures = this.store.select(selectGalleryImages);

      this.serie$ = this.store.pipe(
        select(selectGallery),
        switchMap(({category}) => this.store.select(selectCategoryById, category)));

      this.route.params.subscribe(params => {
        this.albumState = params;
        const serie = params.serie ? Number(params.serie) : null;
        this.store.dispatch(new SelectGalleryCategory(serie));
      });

      window.addEventListener('scroll', this.scrollHandler);
  }

  ngAfterViewInit() {
    this.top_ = pageY() + this.navigation.nativeElement.getBoundingClientRect().top;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  get urlPath() {
    return `/${this.appService.langURLPrefix}/${this.slug}`;
  }
}
