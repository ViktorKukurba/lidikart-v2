import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';

import { AppDataService } from '../../services/app-data.service';
import Utils from '../../utils';
import { AppState, selectCategoryById, selectExhibitionImages } from '../../store/reducers';
import { WpCategory } from '../../interfaces/wp-category';
import { LAGalleryItem } from '../../types';
import { LoadExhibitionPosts } from '../../store/actions/posts';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.scss']
})
export class ExhibitionComponent {
  pictures: Observable<LAGalleryItem[]>;
  categoryId: number;
  exhibition$: Observable<WpCategory>;
  pic;
  constructor(
    private store: Store<AppState>,
    private dataService: AppDataService,
    private route: ActivatedRoute) {
      this.exhibition$ = this.route.params.pipe(
        switchMap(({pic, id}) => {
          const catId = Number(id);
          this.pic = pic;
          this.store.dispatch(new LoadExhibitionPosts([catId]));
          return this.store.pipe(select(selectCategoryById, catId));
        }),
        filter(exhibition => Boolean(exhibition)),
        map(exhibition => {
          exhibition.description = Utils.translate(exhibition.description, this.dataService.langValue);
          return exhibition;
        }));
      this.pictures = this.store.select(selectExhibitionImages);
  }
}
